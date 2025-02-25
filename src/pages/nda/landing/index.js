import React from 'react'
import HeroSection from './HeroSection'
import TurningNDASection from './TurningNDASection'
import PrivateEquitySection from './PrivateEquitySection'
import InnovatorSection from './InnovatorSection'
import PlatformsSection from './PlatformsSection'
import CloudSection from './CloudSection'
import TrialSection from './TrialSection'
import NavbarLanding from '../../layout/navbar'
import FooterLanding from '../../layout/footer'

const Home = () => {
    return (
        <div>
            <NavbarLanding />
            <HeroSection />
            <TurningNDASection />
            <PrivateEquitySection />
            <InnovatorSection />
            <PlatformsSection />
            <CloudSection />
            <TrialSection />
            <FooterLanding />
        </div>
    )
}

export default Home
