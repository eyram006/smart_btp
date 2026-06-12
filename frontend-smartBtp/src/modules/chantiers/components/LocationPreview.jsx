/**
 * Composant placeholder pour la prévisualisation de la localisation.
 * Conçu pour accueillir plus tard Google Maps, OpenStreetMap ou la géolocalisation
 * sans modifier CreateChantierPage ni ChantierForm.
 *
 * @param {Object} props
 * @param {string} props.location - Valeur textuelle saisie dans le champ localisation
 */
export default function LocationPreview({ location }) {
  return (
    <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-surface-container relative">
      {/* Placeholder visuel — remplacer par un vrai composant carte */}
      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #707783 19px, #707783 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #707783 19px, #707783 20px)',
          }}
        />
      </div>

      {/* Label central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }} aria-hidden="true">
          {location ? 'location_on' : 'map'}
        </span>
        <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-label-caps shadow-lg">
          {location ? location : 'CARTE INTERACTIVE'}
        </span>
      </div>
    </div>
  );
}
