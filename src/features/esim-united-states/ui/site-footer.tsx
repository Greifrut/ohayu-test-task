import { Container } from "@/shared/ui/container";
import { copyrightYear } from "../model/static-content";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">Ohayu</p>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Travel-ready eSIM plans with instant activation and straightforward pricing.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Resources</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white">Activation Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">eSIM Compatibility</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Refund Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
          © {copyrightYear} Ohayu. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
