import { NextRequest, NextResponse } from "next/server";
import { hasSession } from "../../../../shared/lib/auth";
import { apiFetch, ApiMethod } from "../../../../shared/api/apiFetch";

function resolveUrl(url: string) {
  const { pathname } = new URL(url);
  return `${pathname.split("/api/bff")[1]}`;
}

const public_routes = ["/api/bff/users"];

const isPublicRoute = (route: string) =>
  public_routes.some((r) => route.endsWith(r));

export async function handler(request: NextRequest) {
  const session = await hasSession();

  const { url, method } = request as {
    url: string;
    method: ApiMethod;
  };

  if (!isPublicRoute(url) && !session) {
    return NextResponse.json("Não está autenticado", {
      status: 401,
    });
  }

  const body =
    method === "POST" || method === "PATCH" ? await request.json() : undefined;

  const { data, isOk } = await apiFetch[
    method.toLowerCase() as keyof typeof apiFetch
  ](`${process.env.API_BACKEND_URL}${resolveUrl(url)}`, body);

  return NextResponse.json({ data, isOk });
}

export { handler as GET, handler as POST };
