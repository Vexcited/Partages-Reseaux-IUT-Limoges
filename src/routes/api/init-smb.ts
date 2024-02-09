import type { APIHandler } from "@solidjs/start/server";

import { initWebSSLVPNSession } from "fortigate-web-sslvpn";
import { U_VPN_ORIGIN, SMB_IUT, SMB_USER, SMB_DOMAIN } from "~/utils/constants";
import { serializeFiles } from "~/utils/files";

export const POST: APIHandler = async ({ request }) => {
  const body = await request.json();
  const { username, password, path } = body as {
    username?: string,
    password?: string,
    path?: string
  };

  if (!username || !password || !path) {
    return new Response("Le nom d'utilisateur et/ou mot de passe et/ou chemin SMB est/sont incorrect(s)", { status: 400 });
  }

  if (!path.startsWith(SMB_IUT) && !path.startsWith(SMB_USER)) {
    return new Response("Le chemin SMB doit être un qui est fourni par l'université", { status: 400 });
  }

  const vpn = await initWebSSLVPNSession(username, password, U_VPN_ORIGIN);
  const smb = await vpn.initSMB(path, SMB_DOMAIN, {
    username,
    password
  });

  return {
    vpn_token: vpn.token,
    smb_token: smb.token,
    files: serializeFiles(smb.files)
  };
};
