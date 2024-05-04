import React, { useState, useEffect } from "react";
import cityTimezones from 'city-timezones';

interface IDateConfig {
    city?: string;
}

const Date: React.FC<IDateConfig > = ({ city }) => {
    const [date, setDate] = useState(new globalThis.Date());
    const [timeZone, setTimeZone] = useState<string | undefined>(city);

    // const handleCurrentDate = (e:React.ChangeEvent<HTMLButtonElement>)=>{
    //     e.preventDefault();
    //     setDate(new globalThis.Date())
    // }

    if (city == "Alexandria Governorate"){
        city = "Alexandria"
    }

    useEffect(() => {
        if (city) {
            const timeZoneInfo = cityTimezones.lookupViaCity(city);
            if (timeZoneInfo && timeZoneInfo.length > 0) {
                setTimeZone(timeZoneInfo[0].timezone);
            } else {
                console.error(`Time zone not found for city: ${city}`);
            }
        }

        const interval = setInterval(() => {
            setDate(new globalThis.Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [city]);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: timeZone || 'UTC',
        weekday: 'long', 
        month: 'long',  
        day: 'numeric',
        year: 'numeric',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const dayOfTheWeek =  formatter.formatToParts(date)[0].value;
    const Day = formatter.formatToParts(date)[4].value;
    const month = formatter.formatToParts(date)[2].value;
    const theDate = formatter.formatToParts(date).slice(8, ).map(part => part.value);

    return (
        <div className={`container mx-auto py-8 flex md:flex-initial md:w-[35%] flex-col text-center rounded-xl shadow-lg shadow-zinc-500/70 dark:shadow-zinc-950/80`}>
            <h4 className="mb-10">{city}</h4>
            <h1>{theDate}</h1>
            <p>{dayOfTheWeek}, {Day} {month}</p>
        </div>
    )
}

export default Date;