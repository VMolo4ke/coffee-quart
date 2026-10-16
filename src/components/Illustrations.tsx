type IconProps = {
  className?: string;
};

export function CoffeeCup({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label="Чашка свежего кофе"
      className={className}
    >
      <ellipse cx="120" cy="212" rx="86" ry="12" fill="#292524" opacity="0.08" />
      <ellipse cx="120" cy="196" rx="84" ry="14" fill="#e7e5e4" />
      <ellipse cx="120" cy="190" rx="84" ry="14" fill="#f5f5f4" />
      <path d="M50 96h140v50c0 30-28 52-70 52s-70-22-70-52V96z" fill="#ffffff" stroke="#d6d3d1" strokeWidth="2" />
      <path d="M190 112h10c16 0 26 10 26 24s-10 24-26 24h-14" fill="none" stroke="#d6d3d1" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="120" cy="96" rx="70" ry="14" fill="#a8a29e" opacity="0.5" />
      <ellipse cx="120" cy="98" rx="62" ry="10" fill="#713f12" />
      <ellipse cx="108" cy="96" rx="22" ry="4" fill="#a16207" opacity="0.6" />
      <g fill="none" stroke="#a8a29e" strokeWidth="5" strokeLinecap="round" opacity="0.7">
        <path className="steam steam-1" d="M96 78c-12-14 12-22 0-38" />
        <path className="steam steam-2" d="M122 78c-12-14 12-22 0-38" />
        <path className="steam steam-3" d="M148 78c-12-14 12-22 0-38" />
      </g>
    </svg>
  );
}

export function CoffeeBean({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="32" rx="18" ry="26" transform="rotate(35 32 32)" fill="#854d0e" />
      <path
        d="M20 14c10 8 4 18 14 24s2 12-2 14"
        transform="rotate(0 32 32)"
        fill="none"
        stroke="#fbf9f6"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

type BagProps = IconProps & {
  color: string;
  label: string;
};

export function CoffeeBag({ className = '', color, label }: BagProps) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <path d="M32 24h56l8 78a6 6 0 0 1-6 7H30a6 6 0 0 1-6-7l8-78z" fill={color} />
      <path d="M32 24h56l2 18H30l2-18z" fill="#000" opacity="0.12" />
      <rect x="30" y="16" width="60" height="10" rx="3" fill="#292524" opacity="0.85" />
      <rect x="40" y="56" width="40" height="34" rx="6" fill="#fbf9f6" opacity="0.92" />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="900"
        fontSize="18"
        fill="#292524"
      >
        {label}
      </text>
    </svg>
  );
}

export function DripBag({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <path d="M22 40h76v10a8 8 0 0 1-8 8h-4l-6 6H40l-6-6h-4a8 8 0 0 1-8-8V40z" fill="#d6d3d1" />
      <path d="M30 40l8 44a8 8 0 0 0 8 6h28a8 8 0 0 0 8-6l8-44H30z" fill="#a16207" />
      <path d="M38 58h44" stroke="#fbf9f6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M60 18v22" stroke="#78716c" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
