import { MainThreadHandlers } from './MainThreadHandler'
import { EmberClientConnection } from 'utils/EmberClientConnection'
import { EmberServerConnection } from 'utils/EmberServerConnection'

declare global {
  namespace NodeJS {
      interface Global {
          mainThreadHandler: MainThreadHandlers
          emberClientConnection: EmberClientConnection
          emberServerConnection: EmberServerConnection
          emberClientStore: any
      }
  }
}

global.mainThreadHandler = new MainThreadHandlers()