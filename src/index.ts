import "dotenv/config"
import BotWhatsapp from '@bot-whatsapp/bot'
import MockAdapter from '@bot-whatsapp/database/mock'
import ProviderWS from '@bot-whatsapp/provider/baileys'
import database from './database';
import flow from './flow';
import { initServer } from "./services/http";

const flujoDeSaludar = BotWhatsapp.addKeyword(['Hola','Buenos dias','Buenas tardes'])
.addAnswer('Bienvenido a *cafeteria y restaurante lilis del dorado*')
.addAnswer('Escribe el dia de la semana que deseas conocer el menu?')
.addAnswer('*Lunes*')
.addAnswer('*Martes*')
.addAnswer('*Miercoles*')
.addAnswer('*Jueves*')
.addAnswer('*Viernes*')

const categoria = BotWhatsapp.addKeyword(['Lunes','Martes','Miercoles','Jueves','Viernes'])
.addAnswer('*Escribe el numero o la palabra del menu que deseas conocer:*')
.addAnswer('*1. Desayunos*')
.addAnswer('*2. Almuerzos*')
.addAnswer('*3. Snacks*')

const desayuno = BotWhatsapp.addKeyword(['Desayunos,', '1'])
.addAnswer('*El dia de hoy te ofrecemos en desayunos :*')
.addAnswer(['1. Huevos al gusto + arroz + chocolate + pan', '*Precio $8.500*'])
.addAnswer(['2. Caldo de costilla + chocolate + pan', '*Precio $10.500*'])
.addAnswer(['*Escribe el numero que deseas pedir*'])

const caldo = BotWhatsapp.addKeyword(['2'])
.addAnswer('*Caldo de costilla añadido a tu pedido*')
.addAnswer('En prontos minutos te avisaremos cuando tu pedido este listo.')
.addAnswer('Muchas gracias por tu espera :)')


// Funcion principal del bot
const main = async () => {

    await BotWhatsapp.createBot({
        database: new MockAdapter(),
        flow: BotWhatsapp.createFlow([flujoDeSaludar, categoria, desayuno, caldo]),
        provider: BotWhatsapp.createProvider(ProviderWS)
    })

}

main()