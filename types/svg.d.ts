declare namespace JSX {
  interface IntrinsicElements {
    svg: React.DetailedHTMLProps<React.SVGProps<SVGSVGElement>, SVGSVGElement>;
    g: React.DetailedHTMLProps<React.SVGProps<SVGGElement>, SVGGElement>;
    path: React.DetailedHTMLProps<React.SVGProps<SVGPathElement>, SVGPathElement>;
    rect: React.DetailedHTMLProps<React.SVGProps<SVGRectElement>, SVGRectElement>;
    circle: React.DetailedHTMLProps<React.SVGProps<SVGCircleElement>, SVGCircleElement>;
    line: React.DetailedHTMLProps<React.SVGProps<SVGLineElement>, SVGLineElement>;
  }
}
