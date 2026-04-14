import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { EventItem } from "@/lib/types/event.type";
import {MapPin, CalendarDays, Clock, Heart} from "lucide-react";
import React, { useState } from "react";
import { formatDate } from "@/lib/helpers/formatter";

const EventCard = ({title,slug,image,start_date,start_time,end_time,venue,fav}: EventItem & {fav: boolean}) => {
    const [favourite, setFavourite] = useState<boolean>(fav);
    return (
      <Link 
          href={`/events/${slug}`}
          className="group flex flex-col gap-3 overflow-hidden"
      >
          <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
              <Button
                  className="absolute top-2 right-2 z-10 rounded-full p-2 text-white bg-black/30 opacity-0 group-hover:opacity-100 hover:bg-black/60 transition"
                  onClick={(e) => {
                        e.preventDefault();
                        setFavourite(!favourite);
                  }}
              >
                  <Heart size={16} fill={favourite? "red":"none"}/>
              </Button>
              <Image
                  src={image || ""}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
              />
          </div>

          <div
              className="flex flex-col gap-2"
          >
              {venue &&
                  <div className="flex flex-row gap-2 items-center text-sm max-sm:text-[10px] text-muted-foreground font-bold">
                      <MapPin size={16}/> 
                      <p>
                          {`${venue.city}, ${venue.country}`}
                      </p> 
                  </div>
              }
              {title && 
                  <p className="font-bold text-left text-lg max-sm:text-sm text-primary">{title}</p>
              }
              {(start_date || (start_time && end_time)) && (
                  <div className="flex flex-row justify-start items-center text-sm max-sm:text-[10px] text-muted-foreground divide-x divide-muted-foreground/30">
                      <div className="flex flex-row items-center gap-2 pr-4">
                          <CalendarDays size={16}/>
                          {formatDate(start_date)}
                      </div>
                      {start_time && end_time && (
                          <div className="flex flex-row items-center gap-2 pl-4">
                              <Clock size={16}/>
                              {`${start_time} - ${end_time}`}
                          </div>
                      )}
                  </div>
              )}
          </div>
      </Link>
    )
}

export default EventCard