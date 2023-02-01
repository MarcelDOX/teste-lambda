const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const to = require('to-case')

exports.handler = async (event, context, callback) => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true }
    })
    users.map(user => {
      user.teste = to.camel('what_the_heck')
    })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    }
  }
}
