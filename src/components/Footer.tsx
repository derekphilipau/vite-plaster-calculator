export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col items-center gap-2 text-sm text-muted-foreground">
      <p className="flex items-center gap-1">
        <a href="https://glazy.org" aria-label="Glazy">
          <svg
            className="w-8 h-7 text-orange-500"
            viewBox="10.233 37.431 399.072 345.607"
            fill="currentColor"
          >
            <path d="M151.689 383.039c-4.538-49.805 1.951-118.691 56.465-138.515 61.487-22.36 103.53 32.957 117.281 86.483l10.934.009c-17.133-71.619-66.557-123.375-124.856-123.375-71.719 0-128.969 72.142-128.34 175.398v-.001h-72.94L209.769 37.431l199.536 345.607H151.689v.001z" />
          </svg>
        </a>
        &copy;{new Date().getFullYear()}{" "}
        <a href="https://derekau.net" className="underline">
          Derek Au
        </a>
      </p>

      <p>
        <a
          href="https://www.paypal.com/donate/?cmd=_donations&business=VN8HBLPQG6N3E&currency_code=USD&source=url"
          className="underline"
        >
          Buy me a coffee ☕
        </a>
      </p>
    </footer>
  );
}
