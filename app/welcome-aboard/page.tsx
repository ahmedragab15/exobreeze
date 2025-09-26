import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Building2 } from "lucide-react"
import Image from "next/image"

export default function WelcomeAboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="p-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" width={150} height={150} className="object-cover h-auto w-36" alt="Logo" />
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-blue-600 md:text-5xl text-balance">Welcome aboard!</h1>
            <p className="text-lg text-muted-foreground">Tell us who you are</p>
          </div>

          <div className="space-y-4">
            <Card className="transition-colors border-2 border-blue-200 cursor-pointer hover:border-blue-400 group">
              <CardContent className="p-6">
                <Link href="/questionnaire/individual" className="block">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="mb-2 text-xl font-semibold text-foreground">Individual</h3>
                      <p className="leading-relaxed text-muted-foreground">
                        Track real-time air quality, receive instant alerts, and make daily choices that keep you and your loved ones healthier
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="transition-colors border-2 border-blue-200 cursor-pointer hover:border-blue-400 group">
              <CardContent className="p-6">
                <Link href="/questionnaire/construction" className="block">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="mb-2 text-xl font-semibold text-foreground">Construction firm</h3>
                      <p className="leading-relaxed text-muted-foreground">
                        Discover the cleanest, healthiest sites for your next project and plan with confidence using detailed air-quality insights
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4">
            <Button size="lg" className="px-12 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700" asChild>
              <Link href="/questionnaire/individual">Continue</Link>
            </Button>
          </div>
        </div>

        <footer className="mt-16 text-sm text-center text-muted-foreground">©2025 | EXOBreeze</footer>
      </main>
    </div>
  );
}
