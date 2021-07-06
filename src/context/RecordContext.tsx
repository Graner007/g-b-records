import * as React from "react";

interface RecordContextInterface {
    id: number;
    name: string;
    artistId: number;
    genreId: number;
    description: string;
    releaseDate: Date;
    albumCover: string;
}

export const RecordCtx = React.createContext<RecordContextInterface[] | null>(null);

const sampleAppContext: RecordContextInterface[] = [
    {
        id: 1,
        name: "Elvis is Back!",
        artistId: 1,
        genreId: 1,
        description: "Elvis Is Back! is the fourth studio album by American rock and roll singer Elvis Presley, released by RCA Victor on April 8, 1960. It was Presley's first album issued in stereophonic sound. Recorded over two sessions in March and April, the album marked Presley's return to recording after his discharge from the U.S. Army. It was Presley's first album of new material since Elvis' Christmas Album was issued in 1957.",
        releaseDate: new Date("1960-04-08"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 2,
        name: "Elvis",
        artistId: 1,
        genreId: 1,
        description: "Elvis (also known as Elvis Presley No. 2) is the second studio album by American rock and roll singer Elvis Presley, released by RCA Victor on October 19, 1956 in mono. Recording sessions took place on September 1, September 2, and September 3 at Radio Recorders in Hollywood, with one track left over from the sessions for Presley's debut album at the RCA Victor recording studios on January 30 in New York. It spent four weeks at #1 on the Billboard Top Pop Albums chart that year, making Presley the first recording artist to have both albums go straight to number one in the same year. It would go on to spend 5 weeks at #1 in total. It was certified Gold on February 17, 1960, and Platinum on August 10, 2011, by the Recording Industry Association of America.",
        releaseDate: new Date("1956-10-19"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 3,
        name: "King Creol",
        artistId: 1,
        genreId: 1,
        description: "King Creole is the second soundtrack album by American singer and musician Elvis Presley, issued by RCA Victor, LPM 1884 in mono in September 1958, recorded in four days at Radio Recorders in Hollywood. It contains songs written and recorded expressly for the 1958 film of the same name starring Presley, and peaked at No. 2 on the Billboard Top Pop Albums chart. The album was previously released as an EP album with two volumes, King Creole Vol 1 and King Creole Vol 2. King Creole Vol 1 peaked at #1 for 30 weeks on the EP album charts. It followed the film's release by over ten weeks. It was certified Gold on July 15, 1999 by the Recording Industry Association of America.",
        releaseDate: new Date("1958-09-18"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 4,
        name: "Twist and Shout!",
        artistId: 2,
        genreId: 2,
        description: "Twist and Shout was the Beatles' second album released in Canada, in mono by Capitol Records (catalogue number T-6054) on 3 February 1964. It consists of songs mostly drawn from Please Please Me, their first LP released in the United Kingdom. This album, like its parent album, contains both original Beatles songs, as well as covers (including its namesake, \"Twist and Shout\"), denoted in the track listing.",
        releaseDate: new Date("1964-02-03"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 5,
        name: "Meet the Beatles!",
        artistId: 2,
        genreId: 1,
        description: "Meet the Beatles! is a studio album by the English rock band the Beatles, released as their second album in the United States. It was the group's first American album to be issued by Capitol Records, on 20 January 1964 in both mono and stereo formats. It topped the popular album chart on 15 February 1964 and remained at number one for eleven weeks before being replaced by The Beatles' Second Album. The cover featured Robert Freeman's iconic portrait of the Beatles used in the United Kingdom for With the Beatles, with a blue tint added to the original stark black-and-white photograph.",
        releaseDate: new Date("1964-01-20"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 6,
        name: "The Eminem Show",
        artistId: 3,
        genreId: 3,
        description: "The Eminem Show is the fourth studio album by American rapper Eminem. After it had originally scheduled for release on June 4, 2002, the album was released on May 26, 2002, by Aftermath Entertainment, Shady Records, and Interscope Records due to pirating and bootlegging of it. The album saw Eminem take a substantially more predominant production role; most of it was self-produced, with his longtime collaborator Jeff Bass, and Dr. Dre being the album's executive producer. It features guest appearances from Obie Trice, D12, Dr. Dre, Nate Dogg, Dina Rae and Eminem's daughter Hailie Jade Scott-Mathers.",
        releaseDate: new Date("2002-05-26"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 7,
        name: "Relapse",
        artistId: 3,
        genreId: 3,
        description: "Relapse is the sixth studio album by American rapper Eminem. It was released on May 19, 2009, by Aftermath Entertainment, Shady Records, and Interscope Records. It was his first album of original material since Encore (2004), following a four-year hiatus from recording due to his writer's block and an addiction to prescription sleeping medication. Recording sessions for the album took place during 2008 to 2009 at several recording studios, and Dr. Dre, Mark Batson, and Eminem handled production.",
        releaseDate: new Date("2009-05-19"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 8,
        name: "Master of Puppets",
        artistId: 4,
        genreId: 4,
        description: "Master of Puppets is the third studio album by American heavy metal band Metallica, released on March 3, 1986, by Elektra Records. Recorded in Denmark at Sweet Silence Studios with producer Flemming Rasmussen, it was the band's last album to feature bassist Cliff Burton, who died in a bus accident in Sweden during the album's promotional tour.",
        releaseDate: new Date("1986-03-03"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 9,
        name: "Load",
        artistId: 4,
        genreId: 4,
        description: "Load is the sixth studio album by the American heavy metal band Metallica, released on June 4, 1996 by Elektra Records in the United States and by Vertigo Records internationally. The album showed more of a hard rock side of Metallica than the band's typical thrash metal style, which alienated much of the band's fanbase. It also featured influences from genres such as Southern rock, blues rock, country rock, and alternative rock. Drummer Lars Ulrich said about Load's more exploratory nature, \"This album and what we're doing with it – that, to me, is what Metallica are all about: exploring different things. The minute you stop exploring, then just sit down and fucking die\". Load is the first of Metallica's albums to feature only three songwriters, the other being 2016's Hardwired... to Self-Destruct. At 79 minutes, Load is Metallica's longest studio album.",
        releaseDate: new Date("1996-06-04"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    },
    {
        id: 10,
        name: "Thriller",
        artistId: 5,
        genreId: 2,
        description: 'Thriller is the sixth studio album by American singer and songwriter Michael Jackson, released on November 30, 1982, by Epic Records. It was produced by Quincy Jones, who had previously worked with Jackson on his 1979 album Off the Wall. Jackson wanted to create an album where "every song was a killer". With the ongoing backlash against disco, he moved in a new musical direction, resulting in a mix of pop, post-disco, rock, funk, and soul sounds. Thriller foreshadows the contradictory themes of Jackson\'s personal life, as he began using a motif of paranoia and darker themes. The album features a single guest appearance, with Paul McCartney becoming the first artist to be featured on one of Jackson\'s albums. Recording took place from April to November 1982 at Westlake Recording Studios in Los Angeles, with a production budget of $750,000.',
        releaseDate: new Date("1983-11-30"),
        albumCover: "http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg"  
    }
];

export const RecordContextProvider = (props: any) => (
  <RecordCtx.Provider value={sampleAppContext}>{props.children}</RecordCtx.Provider>
);