import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllTodos } from '../../businessLogic/todos'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils';


// TODO: Get all TODO items for a current user

import { createLogger } from '../../utils/logger';

const logger = createLogger('getAlltodos');

export const handler = middy( async (event: APIGatewayProxyEvent):
  Promise<APIGatewayProxyResult> => {

    logger.info('Processing event: ', event)

    const userId = getUserId(event)


    const todos = await getAllTodos(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }

  })


handler.use(
  cors({
    credentials: true
  })
)