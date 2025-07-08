
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Target, Calendar, DollarSign } from "lucide-react";

const performanceData = [
  { year: 2020, budget: 1442523, actual: 2134000, achievement: 133, targetIncrease: 20, gpGrowth: 47 },
  { year: 2019, budget: 1200000, actual: 1442523, achievement: 120, targetIncrease: 50, gpGrowth: 71 },
  { year: 2018, budget: 800000, actual: 838731, achievement: 105, targetIncrease: 56, gpGrowth: -17 },
  { year: 2017, budget: 511919, actual: 1012741, achievement: 198, targetIncrease: 91, gpGrowth: 76 },
  { year: 2016, budget: 300000, actual: 573932, achievement: 191, targetIncrease: 66, gpGrowth: 169 },
  { year: 2015, budget: 180000, actual: 213000, achievement: 118, targetIncrease: null, gpGrowth: null },
];

const summaryStats = [
  { icon: Target, label: "Total Achievement", value: "865%", description: "Cumulative target achievement" },
  { icon: TrendingUp, label: "Target Growth", value: "283%", description: "Year-over-year target increases" },
  { icon: DollarSign, label: "GP Growth", value: "346%", description: "Gross profit growth over period" },
  { icon: Calendar, label: "Years Tracked", value: "6", description: "Consistent performance delivery" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function Numbers() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-px h-16 bg-gradient-to-b from-green-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-10 left-20 w-px h-20 bg-gradient-to-b from-emerald-400/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-green-400/60 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            The Numbers
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            SoftwareONE performance data showcasing consistent achievement and growth across 6 years.
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {summaryStats.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
                    {stat.value}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Performance Table */}
        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-green-400 text-center">
              SoftwareONE Annual Performance (2015-2020)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300 font-semibold">Year</TableHead>
                    <TableHead className="text-gray-300 font-semibold">Budget (GP)</TableHead>
                    <TableHead className="text-gray-300 font-semibold">Actual Finish (GP)</TableHead>
                    <TableHead className="text-gray-300 font-semibold">Achievement vs Target</TableHead>
                    <TableHead className="text-gray-300 font-semibold">Target Increase YoY</TableHead>
                    <TableHead className="text-gray-300 font-semibold">GP Growth YoY</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((row) => (
                    <TableRow key={row.year} className="border-gray-700/50 hover:bg-gray-700/20">
                      <TableCell className="font-medium text-white">{row.year}</TableCell>
                      <TableCell className="text-gray-200">{formatCurrency(row.budget)}</TableCell>
                      <TableCell className="text-gray-200">{formatCurrency(row.actual)}</TableCell>
                      <TableCell className={`font-semibold ${row.achievement >= 120 ? 'text-green-400' : row.achievement >= 100 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {row.achievement}%
                      </TableCell>
                      <TableCell className="text-gray-200">
                        {row.targetIncrease ? `${row.targetIncrease}%` : 'N/A'}
                      </TableCell>
                      <TableCell className={`font-semibold ${row.gpGrowth && row.gpGrowth > 0 ? 'text-green-400' : row.gpGrowth && row.gpGrowth < 0 ? 'text-red-400' : 'text-gray-200'}`}>
                        {row.gpGrowth ? `${row.gpGrowth}%` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Summary Row */}
                  <TableRow className="border-gray-700 bg-gray-700/30">
                    <TableCell className="font-bold text-green-400">TOTALS</TableCell>
                    <TableCell className="text-gray-300">-</TableCell>
                    <TableCell className="text-gray-300">-</TableCell>
                    <TableCell className="font-bold text-green-400">865%</TableCell>
                    <TableCell className="font-bold text-green-400">283%</TableCell>
                    <TableCell className="font-bold text-green-400">346%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
