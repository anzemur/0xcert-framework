import { FolderTransferState } from "@0xcert/scaffold";
import { performMutate } from "@0xcert/web3-utils";
import { FolderConfig } from "../core/folder";
import { getFolder, getAccount } from "../utils/contracts";

/**
 * 
 */
export default async function(config: FolderConfig, state: FolderTransferState) {
  const folder = getFolder(config.web3, config.folderId);
  const from = await getAccount(config.web3, config.makerId);
  const paused = state !== FolderTransferState.ENABLED;

  return performMutate(() => {
    return folder.methods.setPause(paused).send({ from });
  });
}
