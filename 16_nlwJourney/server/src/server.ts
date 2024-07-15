import fastify from "fastify";
import cors from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { errorHandler } from "./routes/error-handler";
import { env } from "./env";

import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/Participants/confirm-participant";
import { getParticipants } from "./routes/Participants/get-participants";
import { createActivity } from "./routes/Activity/create-activity";
import { getActivities } from "./routes/Activity/get-activities";
import { createLink } from "./routes/Link/create-link";
import { getLinks } from "./routes/Link/get-links";
import { createInvite } from "./routes/Participants/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/Participants/get-participant";

const app = fastify()

app.register(cors, {
    origin: true
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler) // Trocar o tratamento de erro (pro meu)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.listen({ port: env.PORT }).then(() => {
    console.log('Server running!')
})