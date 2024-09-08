"use client";
import { SelectGeneric } from '@/app/ui/SelectGeneric';
import useOrders from '@/hooks/data/orders/useOrders';
import React, { useMemo, useState } from 'react';
import { Chart, AxisOptions } from 'react-charts'; 
import { subDays, subMonths, subYears, format } from 'date-fns';
import { Tables } from '@/types/database.types';

export default function Page() {
  const [time, setTime] = useState<string>('day'); 
  const startDate = useMemo(() => {
    const now = new Date();
    if (time === 'day') {
      return subDays(now, 1); 
    } else if (time === 'month') {
      return subMonths(now, 1);
    } else {
      return subYears(now, 1); 
    }
  }, [time]);
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const { data: purchases } = useOrders({
    status: "fulfilled",
    filter: {
      column: 'created_at',
      value: formattedStartDate,
      operator: 'gte', 
    },
  });
  const incomeData = useMemo(() => {
    if (!purchases) return [];

    return purchases?.data.map((purchase: Tables<"orders">) => ({
      date: new Date(purchase.created_at),
      income: purchase.price_before_discount - purchase.discount,
    }));
  }, [purchases]);

  const primaryAxis = useMemo<AxisOptions<{ date: Date; income: number }>>(
    () => ({
      getValue: (datum) => datum.date,
      scaleType: 'time', // Explicitly set the scale type to 'time' for dates

    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<{ date: Date; income: number }>[]>(
    () => [
      {
        getValue: (datum) => datum.income,
        scaleType: 'linear', // Explicitly set the scale type to 'linear' for numeric values
      },
    ],
    []
  );
  const options: { label: string; value: string }[] = [
    {
      label: "Last Day",
      value: "day",
    },
    {
      label: "Last Month",
      value: "month",
    },
    {
      label: "Last Year",
      value: "year",
    },
  ];

  return (
    <div>
      <SelectGeneric
        setValueInParent={setTime}
        className="placeholder:text-sm placeholder:text-gray-300 col-span-4"
        inputLabel="Select Time Range"
        options={options}
      />

      {/* Render Chart */}
      <div style={{ height: "400px", marginTop: "20px" }}>
        <Chart
          options={{
            data: [
              {
                label: `Income over ${time}`,
                data: incomeData,
              },
            ],
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
}
