import { NextRequest,NextResponse } from "next/server";


export async function GET(request:NextRequest) {
    const params = new URL(request.url).searchParams;
  const address = params.get('address');
  const latitude = params.get('lat');
  const longitude = params.get('lon');



    let url="";
    if(address)
    {
        url=`https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=46b029641470d0a59f6545a6d0cc16a4`;
    } 
    else{
        url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=46b029641470d0a59f6545a6d0cc16a4`;
    }

    const resp=await fetch(url);
    const data=await resp.json();

    return NextResponse.json({data})


}



