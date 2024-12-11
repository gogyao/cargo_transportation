import { Heading, HeadingGroup, Text } from 'rsuite'

const Landing = () => {
  return (
<div className="mainLandingDiv">
  <div className="banner" style={{ backgroundImage: 'url(/images/imgBanner.jpg', padding: '100px 20px', textAlign: 'center' }} >
    <HeadingGroup>
      <Heading style={{ fontSize: 60, marginBottom: 20, color: 'white', textShadow: '3px 3px 6px rgba(0,0,0,0.8)', WebkitTextStroke: '2px #000' }} >
        ReactExpress Corporation
      </Heading>

      <Text style={{ fontSize: 28, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', WebkitTextStroke: '2px #000' }} >
        Современная организация, меняющая взгляд на транспортировку грузов.
      </Text>
    </HeadingGroup>
  </div>
</div>

  )
}

export default Landing
