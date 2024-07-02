// import { NextRequest,NextResponse } from "next/server";

// export default async function handler(req:NextRequest) {

//     const params = new URL(req.url).searchParams;
//     const address = params.get('address');
    
//         const url = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&cnt=5&appid=46b029641470d0a59f6545a6d0cc16a4`;
//         const response=await fetch(url);
        
//         const resp=await fetch(url);
//         const data=await resp.json();
        
    
//         return NextResponse.json({data})
// }

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&cnt=5&appid=46b029641470d0a59f6545a6d0cc16a4`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
}