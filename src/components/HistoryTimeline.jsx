import { imageMap } from '../data/imageMap'
import { useImages } from '../context/ImageContext'

const timeline = [
  {
    title: 'Early aviation in Germiston',
    paragraphs: [
      "Germiston's aviation story began before Rand Airport became the landmark it is today. The SAA Museum's Rand Airport history records that in 1929, Imperial Airways confirmed its intention to organise a service to South Africa, and that the energy and vision of the Germiston Municipality helped lay the foundation for what would become Rand Airport. The original Germiston Aerodrome was officially opened on Saturday, 24 August 1929, and at that stage it was still a modest grass-covered field with a hangar.",
      "The area's importance grew quickly because Johannesburg needed a proper aviation gateway capable of supporting expanding mail, passenger, and commercial air traffic. In 1931, the Union Government approached Germiston Municipality to provide an airport capable of handling day and night traffic and larger aircraft than those previously used in South Africa. This early investment transformed a simple aerodrome into one of the most important aviation sites in the country.",
    ],
    source: 'South African Airways Museum Society official history.',
  },
  {
    title: 'Rand Airport opening era',
    paragraphs: [
      'Rand Airport was officially opened by the Governor-General, the Earl of Clarendon, on Saturday, 19 December 1931. More than 2,500 people attended the opening, showing how important the new airport was to the region. The following day, 20 December 1931, the first Imperial Airways airmail from London arrived at Rand Airport, connecting Germiston directly to the wider world of international aviation.',
      "The opening era did not stop with the ceremony. In 1932, a full-time airport manager was appointed, and Imperial Airways mail and passenger traffic increased rapidly. South African Airways, formed on 1 February 1934, moved its headquarters from Durban to Rand Airport in 1935, strengthening the airport's role as a centre of South African commercial aviation.",
    ],
    source: 'South African Airways Museum Society official history; The Heritage Portal.',
  },
  {
    title: 'South African aviation heritage',
    paragraphs: [
      "Rand Airport became part of the early backbone of South African civil aviation. As Johannesburg grew in commercial importance, the airport supported mail, passenger travel, airline operations, flying clubs, and aviation training. The SAA Museum history records that South African Airways moved its headquarters from Durban to Rand Airport in 1935, and the airport continued expanding with hangars, a clubhouse, flying schools, workshops, and passenger facilities.",
      "Today, Rand Airport remains a living aviation environment rather than a silent relic. In Your Pocket describes it as a fine example of 1930s Art Deco architecture, once Johannesburg's main commercial airport, and now home to charter flights, aviation schools, and aviation-related activity. Its public viewing areas, historic terminal character, and active aircraft movements keep South African aviation heritage visible to modern visitors.",
    ],
    source: 'South African Airways Museum Society official history; In Your Pocket Johannesburg.',
  },
  {
    title: 'WWII-era aviation relevance',
    paragraphs: [
      'During the Second World War, Rand Airport became important to military aviation activity. The Heritage Portal records that the airport played a vital role as a service base for the South African Air Force during WWII. In early 1939, the Union Defence Force took control of Rand Airport, and by May 1940, commercial flights had ended.',
      "The SAA Museum's history of the Transvaal Aviation Club building also records that during WWII, the South African Air Force's 5 Wing used the clubhouse as an officers' mess, while the wider area functioned as a SAAF station with barracks and related facilities. This gives Rand Airport a direct connection not only to civil aviation, but also to South Africa's wartime aviation story.",
    ],
    source: 'The Heritage Portal; South African Airways Museum Society official history.',
  },
  {
    title: 'SAA Museum',
    paragraphs: [
      'The South African Airways Museum Society is based at the old Transvaal Aviation Club at Rand Airport in Germiston. Its official history says the museum preserves historic items such as photographs, aircraft instruments, timetables, documentation, and other aviation material in its display hall. The society is volunteer-driven and focused on preserving the colourful history of South African civil aviation.',
      "The museum is also home to major aircraft exhibits. The SAA Museum homepage states that visitors can explore what it describes as the only aviation museum in the world with two Boeing 747 aircraft, and that guided experiences allow visitors to step aboard a Boeing 747. The museum's own history records that Boeing 747-244B Lebombo landed at Rand Airport on 5 March 2004 to be preserved for future generations.",
    ],
    source: 'South African Airways Museum Society official history and homepage.',
  },
  {
    title: 'Modern apron restaurant experience',
    paragraphs: [
      'Harvard Cafe\'s modern appeal comes from its rare position inside an active aviation environment. Cvent describes Harvard Cafe as being very close to the runway and apron, allowing patrons to admire aircraft taxiing to and from the runway only a short distance from their table. This makes the venue more than a place to eat; it becomes part restaurant, part viewing deck, and part aviation experience.',
      'In Your Pocket describes Harvard Cafe as the ideal place to soak up the atmosphere of Rand Airport, with outdoor tables beside the tarmac and views of prop planes and helicopters coming and going. That setting turns a meal into a small aviation outing, especially for families, aviation enthusiasts, and visitors looking for something more memorable than a standard restaurant experience.',
    ],
    source: 'Cvent venue listing; In Your Pocket Johannesburg.',
  },
]

function HistoryTimeline() {
  const { getImageForSlot, getAltForSlot } = useImages()

  return (
    <section className="section" id="history">
      <div className="section-heading">
        <p className="eyebrow">Rand Airport History</p>
        <h2>From grass aerodrome to living aviation landmark.</h2>
      </div>
      <div className="history-layout">
        <figure className="section-image-card">
          <img src={getImageForSlot('history-main', imageMap.history.src)} alt={getAltForSlot('history-main', imageMap.history.alt)} loading="lazy" />
        </figure>
        <div className="timeline">
          {timeline.map(({ title, paragraphs, source }, index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="timeline-source">Source: {source}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HistoryTimeline
