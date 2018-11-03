import { FolderTransferState } from "@0xcert/scaffold";
import { FolderConfig } from "../core/folder";
import { performQuery } from "@0xcert/web3-utils";
import { getFolder } from "../utils/contracts";

/**
 * 
 */
export default async function(config: FolderConfig) {
  const folder = getFolder(config.web3, config.folderId);

  return performQuery<FolderTransferState>(async () => {
    const paused = await folder.methods.isPaused().call();
    const state = paused ? FolderTransferState.DISABLED : FolderTransferState.ENABLED;

    return state;
  });
}
