import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { firestore } from '../../../../firebase';
import { collection, query, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

async function handler(request) {

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if (!webhookSecret) {
        console.log("No WH Secret")
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')
  
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      })
    }
  
    const payload = await request.json()
    const body = JSON.stringify(payload)
    

    const wh = new Webhook(webhookSecret)
    let event = null

    try {
        event = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    } catch(err) {
        console.error(err.message)
        return NextResponse.json({}, {status: 400})
    }
    
    const eventType = event.type

    if(event.type == "user.created" || event.type == "user.updated") {
        const docRef = doc(collection(firestore, 'users'), event.data.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const { username, first_name, last_name, emails, sets_of_flashcards } = docSnap.data()
            await setDoc(docRef, { username: event.data.username,  first_name: event.data.first_name, last_name: event.data.last_name, emails: event.data.email_addresses, sets_of_flashcards: sets_of_flashcards})
        } else {
            await setDoc(docRef, { username: event.data.username,  first_name: event.data.first_name, last_name: event.data.last_name, emails: event.data.email_addresses, sets_of_flashcards: []})
        }
    }

    return NextResponse.json({}, {status: 200})
}
export const GET = handler
export const POST = handler
export const PUT = handler