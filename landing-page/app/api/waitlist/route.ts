import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){
  try{
    const{email}=await req.json()
    if(!email||!email.includes('@'))return NextResponse.json({error:'有効なメールアドレスを入力してください'},{status:400})
    console.log(`[Waitlist] ${email}`)
    return NextResponse.json({success:true})
  }catch{return NextResponse.json({error:'サーバーエラー'},{status:500})}
}
