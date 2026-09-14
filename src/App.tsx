import React from 'react';
import { RestaurantProvider } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Introduction } from './components/Introduction';
import { SignatureCuisine } from './components/SignatureCuisine';
import { MenuSection } from './components/MenuSection';
import { FoodSpotlight } from './components/FoodSpotlight';
import { DiningExperience } from './components/DiningExperience';
import { FamilyDining } from './components/FamilyDining';
import { CelebrationsParties } from './components/CelebrationsParties';
import { EventBookingSection } from './components/EventBookingSection';
import { PrivateEvents } from './components/PrivateEvents';
import { GallerySection } from './components/GallerySection';
import { AmbienceSection } from './components/AmbienceSection';
import { ChefSection } from './components/ChefSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { InstagramSection } from './components/InstagramSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

// Modals
import { LightboxModal } from './components/LightboxModal';
import { ReservationModal } from './components/ReservationModal';
import { EventModal } from './components/EventModal';
import { CustomerDashboardModal } from './components/CustomerDashboardModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  return (
    <RestaurantProvider>
      <div className="min-h-screen bg-[#0a0907] text-[#ece4d8] font-sans selection:bg-[#c5a059] selection:text-black antialiased overflow-x-hidden">
        
        {/* Navigation Bar */}
        <Navbar />

        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Story Marquee Banner */}
          <Marquee />

          {/* 3. Introduction & Story */}
          <Introduction />

          {/* 4. Signature Cuisines */}
          <SignatureCuisine />

          {/* 5. Interactive Culinary Menu */}
          <MenuSection />

          {/* 6. Food Spotlight (Signature dishes cinematic showcase) */}
          <FoodSpotlight />

          {/* 7. Dining Experiences (Fine, Family, Celebration, Private) */}
          <DiningExperience />

          {/* 8. Family Dining Sanctuary */}
          <FamilyDining />

          {/* 9. Celebrations & Parties */}
          <CelebrationsParties />

          {/* 10. Event Booking Form */}
          <EventBookingSection />

          {/* 11. Private Events & Royal Chambers */}
          <PrivateEvents />

          {/* 12. Visual Gallery with Lightbox */}
          <GallerySection />

          {/* 13. Ambience & Sensory Architecture */}
          <AmbienceSection />

          {/* 14. Chef & Kitchen Philosophy */}
          <ChefSection />

          {/* 15. Guest Testimonials */}
          <TestimonialsSection />

          {/* 16. Dedicated Table Reservation */}
          <ReservationSection />

          {/* 17. Location & Contact Inquiries */}
          <ContactSection />

          {/* 18. Instagram Visual Feed */}
          <InstagramSection />

          {/* 19. Frequently Asked Questions */}
          <FaqSection />

          {/* 20. Final Grand Invitation CTA */}
          <FinalCta />
        </main>

        {/* 21. Footer */}
        <Footer />

        {/* Global Floating Modals */}
        <LightboxModal />
        <ReservationModal />
        <EventModal />
        <CustomerDashboardModal />
        <AuthModal />

      </div>
    </RestaurantProvider>
  );
}
