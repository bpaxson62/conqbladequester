import { ElectronAPI } from '@electron-toolkit/preload'

interface Api {
  getVersion: () => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
