import { NextRequest, NextResponse } from "next/server";
import { hasSession } from "../../../../shared/lib/auth";
import { apiBackend, ApiMethod } from "../../../../shared/api/apiFetch";

function resolveUrl(url: string) {
  const { pathname } = new URL(url);
  return `${pathname.split("/api/bff")[1]}`;
}

export async function handler(request: NextRequest) {
  const session = await hasSession();

  if (!session) {
    return NextResponse.json("Não está autenticado", {
      status: 401,
    });
  }

  const { url, method } = request as {
    url: string;
    method: ApiMethod;
  };

  const body =
    method === "POST" || method === "PATCH" ? await request.json() : undefined;

  const response = await apiBackend({
    method,
    url: resolveUrl(url),
    body,
    headers: {
      user_id: session?.user?.id,
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
