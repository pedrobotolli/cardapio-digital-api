import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const sweets = await prisma.productCategory.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "Doces",
            description: "Doces deliciosos!",
            products: {
                create: [{
                    name: "Brigadeiro",
                    description: "Brigadeiro artesanal caseiro com produtos de qualidade",
                    price: 5.00,
                    image: "https://picsum.photos/1024/1024"
                },
                {
                    name: "Beijinho",
                    description: "Beijinho artesanal caseiro com produtos de qualidade",
                    price: 4.50,
                    image: "https://picsum.photos/1024/1024"
                }]
            }
        }
    })
    const savory = await prisma.productCategory.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: "Salgados",
            description: "Salgados deliciosos!",
            products: {
                create: [{
                    name: "Coxinha",
                    description: "Coxinha artesanal caseira com produtos de qualidade",
                    price: 5.00,
                    image: "https://picsum.photos/1024/1024"
                },
                {
                    name: "Dogão",
                    description: "Dogão artesanal caseiro com produtos de qualidade",
                    price: 4.50,
                    image: "https://picsum.photos/1024/1024"
                }]
            }
        }
    })
    const pendingApproval = await prisma.orderStatus.upsert({
        where: { id: 1 },
        update: {},
        create: {
            status: "Pendente Aprovação",
            description: "Aguarde um momento, estamos analisando seu pedido!",
        }
    })
    const preparing = await prisma.orderStatus.upsert({
        where: { id: 2 },
        update: {},
        create: {
            status: "Preparando",
            description: "Aguarde um momento, estamos preparando seu pedido!",
        }
    })
    const delivering = await prisma.orderStatus.upsert({
        where: { id: 3 },
        update: {},
        create: {
            status: "Indo até você",
            description: "Falta pouco, seu pedido está indo até você!",
        }
    })
    const done = await prisma.orderStatus.upsert({
        where: { id: 4 },
        update: {},
        create: {
            status: "Entregue",
            description: "Esse pedido já foi entregue!",
        }
    })

    console.log({sweets, savory})
    console.log({pendingApproval, preparing, delivering, done})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })