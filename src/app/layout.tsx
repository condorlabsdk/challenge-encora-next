
"use client";

import "./globals.css";
import {StartMockWorker} from "@/common/component/mockServer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";


export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <StartMockWorker>
            {children}
          </StartMockWorker>
        </QueryClientProvider>
      </body>
    </html>
  );
}

