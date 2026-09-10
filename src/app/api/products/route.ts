import { NextResponse } from "next/server";

const mockProducts = [
  {
    id: 1,
    name: "Iphone 11 128 GB",
    brand: "Apple",
    description: "Garante alto desempenho e fotos incríveis.",
    price: 5000,
  },
  {
    id: 2,
    name: "MacBook Air",
    brand: "Apple",
    description: "Processador potente para todas as suas tarefas.",
    price: 8200,
  },
  {
    id: 3,
    name: "JBL Flip 6",
    brand: "JBL",
    description: "Som potente e cristalino para suas festas.",
    price: 650,
  },
  {
    id: 4,
    name: "Galaxy Watch 4",
    brand: "Samsung",
    description: "Monitore sua saúde e treinos diariamente.",
    price: 1200,
  },
  {
    id: 5,
    name: "Headset HyperX",
    brand: "HyperX",
    description: "Áudio imersivo e extremo conforto para jogos.",
    price: 450,
  },
  {
    id: 6,
    name: "Mouse Logitech MX",
    brand: "Logitech",
    description: "Ergonomia avançada para máxima produtividade.",
    price: 550,
  },
  {
    id: 7,
    name: "iPad Air 64GB",
    brand: "Apple",
    description: "Tela liquid retina fantástica e chip rápido.",
    price: 4200,
  },
  {
    id: 8,
    name: "Kindle Paperwhite",
    brand: "Amazon",
    description: "Leitura confortável como no papel, à prova d'água.",
    price: 700,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rows = Number(searchParams.get("rows")) || 8;
  const page = Number(searchParams.get("page")) || 1;

  const startIndex = (page - 1) * rows;
  const paginatedProducts = mockProducts.slice(startIndex, startIndex + rows);

  return NextResponse.json({
    products: paginatedProducts,
    count: mockProducts.length,
  });
}
