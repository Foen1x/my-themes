import type { Metadata } from "next"
import { themeIds } from "@my-themes/theme-contract"
import { AppShell } from "@/components/app-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import "./globals.css"

export const metadata: Metadata = {
  title: "Theme Lab · shadcn",
  description: "A complete shadcn component and semantic theme catalog.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" themes={[...themeIds]} enableSystem={false} storageKey="my-themes:theme" disableTransitionOnChange>
          <Toaster>
            <AppShell>{children}</AppShell>
          </Toaster>
        </ThemeProvider>
      </body>
    </html>
  )
}
