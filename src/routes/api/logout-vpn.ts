import type { APIHandler } from "@solidjs/start/server";

import { FortiGateWebSSLVPN } from "fortigate-web-sslvpn";
import { U_VPN_ORIGIN } from "~/utils/constants";

export const POST: APIHandler = async ({ request }) => {
  const body = await request.json()
  const { vpn_token } = body as { vpn_token?: string };

  if (!vpn_token) {
    return new Response("Le token du VPN vide", { status: 400 });
  }

  const vpn = new FortiGateWebSSLVPN(vpn_token, U_VPN_ORIGIN);
  const status = await vpn.close();

  return new Response(status ? null : "Échec de la déconnexion", { status: status ? 200 : 500 });
};
