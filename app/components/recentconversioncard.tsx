import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ConversionResult {
  id: number;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  result: string;
}

interface RecentConversionsProps {
  history: ConversionResult[];
  onHistoryItemClick: (item: ConversionResult) => void;
}

export default function RecentConversions({ history, onHistoryItemClick }: RecentConversionsProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="max-w-md mx-auto backdrop-blur-sm bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl">Recent Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onHistoryItemClick(item)}
                >
                  <TableCell>{item.fromCurrency}</TableCell>
                  <TableCell>{item.toCurrency}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}