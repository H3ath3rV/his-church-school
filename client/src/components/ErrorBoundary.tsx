import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { withSiteBase } from "@/lib/sitePaths";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#F6F2EA] px-6 py-12">
          <div className="w-full max-w-xl rounded-[2rem] border border-[#DCCFB4] bg-white px-8 py-10 text-center shadow-[0_20px_50px_rgba(5,16,64,0.08)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#051040] text-[#C9A84C]">
              <AlertTriangle size={28} />
            </div>
            <p className="font-label text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#051040]/55">
              Something Went Wrong
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-[#051040]">
              This page needs a quick refresh.
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-base leading-relaxed text-[#051040]/68">
              An unexpected error interrupted the page. Please reload and try
              again, or return to the home page to continue browsing.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={withSiteBase("/")}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#051040]/14 px-6 py-3 font-label text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[#051040] transition-colors hover:bg-[#EEF2FB]"
              >
                Back to Home
              </a>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#051040] px-6 py-3 font-label text-[0.78rem] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#051040]/88"
                type="button"
              >
                <RotateCcw size={16} />
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
