export const metadata = {
  title: "DOVO Livescore",
  description: "Live wedstrijdverslag voor DOVO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}