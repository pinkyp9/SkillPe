"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    avgCost: 4200,
    industryAvg: 5000,
  },
  {
    name: "Feb",
    avgCost: 3800,
    industryAvg: 5000,
  },
  {
    name: "Mar",
    avgCost: 4500,
    industryAvg: 5000,
  },
  {
    name: "Apr",
    avgCost: 4100,
    industryAvg: 5000,
  },
  {
    name: "May",
    avgCost: 3900,
    industryAvg: 5000,
  },
  {
    name: "Jun",
    avgCost: 3700,
    industryAvg: 5000,
  },
]

const departmentData = [
  {
    name: "Engineering",
    avgCost: 5200,
    industryAvg: 6000,
  },
  {
    name: "Marketing",
    avgCost: 3800,
    industryAvg: 4500,
  },
  {
    name: "Sales",
    avgCost: 4100,
    industryAvg: 4800,
  },
  {
    name: "Design",
    avgCost: 4300,
    industryAvg: 5200,
  },
  {
    name: "Product",
    avgCost: 4900,
    industryAvg: 5500,
  },
]

const CostPerHireChart = () => {
  // Axios call to fetch cost per hire data
  // useEffect(() => {
  //   const fetchCostData = async () => {
  //     try {
  //       const response = await axios.get('/api/analytics/cost-per-hire');
  //       // Update state with response data
  //     } catch (error) {
  //       console.error('Error fetching cost per hire data:', error);
  //     }
  //   };
  //   fetchCostData();
  // }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Cost Per Hire</CardTitle>
        <CardDescription>Average cost per hire compared to industry standards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-2">Monthly Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Cost"]} labelFormatter={(label) => `Month: ${label}`} />
                <Legend />
                <Bar name="Your Avg Cost" dataKey="avgCost" fill="#0088FE" />
                <Bar name="Industry Avg" dataKey="industryAvg" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">By Department</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Cost"]}
                  labelFormatter={(label) => `Department: ${label}`}
                />
                <Legend />
                <Bar name="Your Avg Cost" dataKey="avgCost" fill="#0088FE" />
                <Bar name="Industry Avg" dataKey="industryAvg" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Average Cost</p>
            <p className="text-2xl font-bold">$4,033</p>
            <p className="text-xs text-green-600">19.3% below industry avg</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Highest Cost</p>
            <p className="text-2xl font-bold">$5,200</p>
            <p className="text-xs text-muted-foreground">Engineering dept.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Lowest Cost</p>
            <p className="text-2xl font-bold">$3,700</p>
            <p className="text-xs text-muted-foreground">June 2023</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CostPerHireChart

