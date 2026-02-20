import { createClient } from '@supabase/supabase-js'


// export async function onRequest(request,context) {
//  return new Response('Order api is running', {status: 200});
// }



const headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

// MEMBUAT CLIENT SUPABASE
const supabase = createClient(
    'https://vuxcwysmkimncjhcbfuk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1eGN3eXNta2ltbmNqaGNiZnVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDAzODM0OCwiZXhwIjoyMDg1NjE0MzQ4fQ.z-78ytLv5qXVMChTMBj2g5J1YycVH8eNVfQxJ2Iu8Y4'
)


export async function onRequestPost(context){
const orderData = await context.request.json()

if(!orderData.influencer_id || !orderData.sme_id || !orderData.campaign_title){
    return new Response(JSON.stringify({error: 'Invalid order data'}),{
    status: 400,
    headers: headers
    });
}

const {data, error} = await supabase.from('orders')
.insert([orderData])
.select();

if(error){
    return new Response(JSON.stringify({error: error.message}),{
    status: 500,
    headers: headers
    });
}

return new Response(JSON.stringify({order: data[0]}),{
    status: 201,
    headers: headers
})

}


export async function onRequestOptions(){
    return new Response(null, {
        status:200,
        headers: headers
    });
}


