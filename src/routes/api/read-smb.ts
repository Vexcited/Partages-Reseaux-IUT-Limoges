import type { APIHandler } from "@solidjs/start/server";

import { FortiGateWebSSLVPN } from "fortigate-web-sslvpn";
import { U_VPN_ORIGIN, SMB_IUT, SMB_USER, SMB_DOMAIN } from "~/utils/constants";
import { serializeFiles } from "~/utils/files";

export const POST: APIHandler = async ({ request }) => {
  const body = await request.json()
  const { vpn_token, smb_token, path } = body as {
    vpn_token?: string,
    smb_token?: string,
    path?: string
  };

  if (!vpn_token || !smb_token || !path) {
    return new Response("Le(s) token(s) et/ou chemin SMB est/sont incorrect(s)", { status: 400 });
  }

  if (!path.startsWith(SMB_IUT) && !path.startsWith(SMB_USER)) {
    return new Response("Le chemin SMB doit être un qui est fourni par l'université", { status: 400 });
  }

  const vpn = new FortiGateWebSSLVPN(vpn_token, U_VPN_ORIGIN);
  const files = await vpn.readDirectoryFromSMB(path, SMB_DOMAIN, smb_token);
  
  return serializeFiles(files);
}
