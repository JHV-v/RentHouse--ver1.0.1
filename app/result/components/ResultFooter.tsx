export default function ResultFooter() {
  return (
    <footer className="bg-white border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-desktop w-full max-w-container-max mx-auto gap-stack-md">
        <div className="text-label-md font-headline-sm text-on-surface font-bold tracking-tight">RentScore AI</div>
        <div className="text-body-sm text-on-surface-variant text-center md:text-left">
          © 2025 RentScore AI. Professional Apartment Valuation Tool.
        </div>
        <div className="flex gap-stack-md">
          <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="https://github.com/JHV-v/RentHouse--ver1.0.1" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="https://github.com/JHV-v/RentHouse--ver1.0.1/issues" target="_blank" rel="noopener noreferrer">反馈建议</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="https://github.com/JHV-v/RentHouse--ver1.0.1#readme" target="_blank" rel="noopener noreferrer">评分方法</a>
        </div>
      </div>
    </footer>
  )
}
