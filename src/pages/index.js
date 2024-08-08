// src/pages/index.js
import Head from 'next/head';
import TicketCard from '../components/TicketCard';
import EventCarousel from '../components/Carousel';
import BookingForm from '../components/BookingForm';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';
import DraggableSeat from '../components/DraggableSeat';
import CustomSelect from '../components/CustomSelect';
import styles from '../styles/Home.module.css';

const events = [
  {
    id: 1,
    name: 'Concert A',
    date: '2024-08-07',
    location: 'Venue A',
    image: '/images/concert-a.jpg'
  },
  {
    id: 2,
    name: 'Concert B',
    date: '2024-08-14',
    location: 'Venue B',
    image: '/images/concert-b.jpg'
  }
];

const eventTypes = [
  { value: 'concert', label: 'Concert' },
  { value: 'theater', label: 'Theater' },
  { value: 'sports', label: 'Sports' },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ticket Booking System</title>
        <meta name="description" content="A simple ticket booking system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Upcoming Events</h1>
        <EventCarousel />
        <div className={styles.grid}>
          {events.map(event => (
            <TicketCard key={event.id} event={event} />
          ))}
        </div>
        <BookingForm />
        <ThemeToggle />
        <DraggableSeat />
        <CustomSelect options={eventTypes} value="concert" onChange={() => {}} />
      </main>
    </div>
  );
}



// // pages/index.js
// import Head from 'next/head';
// import TicketCard from '../components/TicketCard';
// import styles from '../styles/Home.module.css';

// const events = [
//   {
//     id: 1,
//     name: 'Concert A',
//     date: '2024-08-07',
//     location: 'Venue A',
//     image: '/images/concert-a.jpg'
//   },
//   {
//     id: 2,
//     name: 'Concert B',
//     date: '2024-08-14',
//     location: 'Venue B',
//     image: '/images/concert-b.jpg'
//   }
// ];

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Ticket Booking System</title>
//         <meta name="description" content="A simple ticket booking system" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Upcoming Events</h1>
//         <div className={styles.grid}>
//           {events.map(event => (
//             <TicketCard key={event.id} event={event} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }
