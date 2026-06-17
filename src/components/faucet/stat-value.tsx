type StatValueProps = {
  value: string | number;
  unit: string;
  isLoading?: boolean;
};

export function StatValue({ value, unit, isLoading }: StatValueProps) {
  return (
    <p className="mt-0.5 font-sans text-2xl tracking-tight sm:text-3xl">
      <span className="font-bold">{isLoading ? "—" : value}</span>{" "}
      <span className="font-normal">{unit}</span>
    </p>
  );
}
