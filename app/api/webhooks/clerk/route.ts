import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SECRET is missing from environment variables');
        throw new Error('Missing CLERK_WEBHOOK_SECRET in environment');
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing Svix headers in the request');
        return new Response('Bad Request: Missing Svix headers', { status: 400 });
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const webhook = new Webhook(WEBHOOK_SECRET)

    let event: WebhookEvent

    // Verify the payload with the headers
    try {
        event = webhook.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occurred', {
            status: 400
        })
    }

    const eventType = event.type

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name } = event.data

        if (!id || !email_addresses) {
            console.error('Invalid user creation data received');
            return new Response('Bad Request: Missing user data', { status: 400 });
        }


        try {
            await prisma.user.create({
                data: {
                    email: email_addresses[0].email_address ,
                    name: first_name || 'Unknown',
                    password: 'password',
                },
            });
            console.info('New user created successfully');
        } catch (dbError) {
            console.error('Database error while creating user', dbError);
            return new Response('Internal Server Error: Could not create user', { status: 500 });
        }
    }

    return new Response('Success', { status: 200 });
}