import Link from 'next/link';
import { Vehicle, formatPrice, formatMileage } from '@/data/vehicles';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const cover = vehicle.images[0];
  return (
    <Link
      href={`/auta/${vehicle.slug}`}
      className="card card-lift group overflow-hidden hover:border-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 bg-accent px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          {vehicle.brand}
        </div>
        <div className="absolute bottom-3 left-3 font-display text-2xl tracking-wider text-white">
          {vehicle.year}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {vehicle.brand} {vehicle.model}
            </h3>
            {vehicle.variant && (
              <p className="text-sm text-text-secondary">{vehicle.variant}</p>
            )}
          </div>
          <div className="text-right">
            <div className="font-display text-2xl text-accent">
              {formatPrice(vehicle.price)}
            </div>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-bg-border pt-4 text-xs text-text-secondary">
          <div>
            <dt className="text-text-muted">Przebieg</dt>
            <dd className="font-medium text-text-primary">{formatMileage(vehicle.mileage)}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Paliwo</dt>
            <dd className="font-medium text-text-primary">{vehicle.fuel}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Moc</dt>
            <dd className="font-medium text-text-primary">{vehicle.power} KM</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
