import { NextRequest, NextResponse } from "next/server";
import { hasSession } from "../../../../shared/lib/auth";
import { apiBackend, ApiMethod } from "../../../../shared/api/apiFetch";

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

  const response = await apiBackend({
    method,
    url: resolveUrl(url),
    body,
    headers: {
      user_id: session ? session?.user?.id : undefined,
    },
  });

  if (response.status >= 400) {
    return NextResponse.json(response.message, {
      status: response.status,
    });
  }

  return NextResponse.json(response.data, {
    status: response.status,
  });
}

export { handler as GET, handler as POST };
