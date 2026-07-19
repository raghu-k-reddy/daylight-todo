import type { ReactNode } from 'react'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { Provider } from 'react-redux'
import { store } from '../store'
import '../../style.css'

export const Route = createRootRoute({
  head: () => ({ meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { title: 'Farmly — Fresh from local farms' }], links: [{ rel: 'preconnect', href: 'https://fonts.googleapis.com' }, { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap' }] }),
  component: RootComponent,
})

function RootComponent() { return <Provider store={store}><RootDocument><Outlet /></RootDocument></Provider> }
function RootDocument({ children }: Readonly<{ children: ReactNode }>) { return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html> }
