import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import LocationChart from "@/components/LocationChart"

const locations = {
  "al-azhar-park": {
    name: "Al-Azhar park",
    currentAqi: 48,
    weeklyAverage: 65,
    visitorsThisWeek: "3.5K",
    changePercent: "36.24%",
    goalPercent: 70,
    lastMonthPercent: 72,
  },
  "family-park": {
    name: "Family park",
    currentAqi: 35,
    weeklyAverage: 45,
    visitorsThisWeek: "2.1K",
    changePercent: "12.5%",
    goalPercent: 70,
    lastMonthPercent: 52,
  },
  "alexandria-corniche": {
    name: "Alexandria corniche",
    currentAqi: 78,
    weeklyAverage: 85,
    visitorsThisWeek: "5.2K",
    changePercent: "-8.3%",
    goalPercent: 70,
    lastMonthPercent: 92,
  },
}

export default function LocationStatsPage({ params }: { params: { slug: string } }) {
  const location = locations[params.slug as keyof typeof locations]

  if (!location) {
    return <div>Location not found</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-semibold">{location.name} AQI statistics</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gray-50">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Current AQI</div>
                  <div className="text-4xl font-bold">{location.currentAqi}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 overflow-hidden bg-blue-200 rounded-full">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(location.currentAqi / 500) * 100}%` }} />
                    </div>
                    <span className="text-sm text-blue-600">32%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Real-time air quality index</div>
                  <div className="text-sm text-muted-foreground">{location.currentAqi} / 500</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Weekly Average AQI</div>
                  <div className="text-4xl font-bold">{location.weeklyAverage}%</div>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray={`${location.weeklyAverage}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium">Goal{location.goalPercent}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-center">
                    <div className="text-sm text-muted-foreground">{location.weeklyAverage}% This Week</div>
                    <div className="text-sm text-muted-foreground">{location.lastMonthPercent}% Last Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Visitors This Week</div>
                  <div className="text-4xl font-bold">{location.visitorsThisWeek}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Last 7 days</span>
                    <Badge
                      variant={location.changePercent.startsWith("-") ? "destructive" : "default"}
                      className={location.changePercent.startsWith("-") ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}
                    >
                      {location.changePercent}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <LocationChart />
        </CardContent>
      </Card>
    </div>
  );
}
