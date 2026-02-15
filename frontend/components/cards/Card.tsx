interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}
