import { useState, useEffect, useRef, useCallback } from "react";
import "../Styles/home.css";

/* ═══════════════ HELPERS ═══════════════ */
const cld = (url, t = "f_auto,q_auto,w_1080") => url.replace("/upload/", `/upload/${t}/`);
const videoPoster = (url, w = 1080) => cld(url, `so_0,f_jpg,q_auto,w_${w}`).replace(/\.mp4$/, ".jpg");
const mediaSrc = (m, w = 1080) => (m.type === "video" ? videoPoster(m.src, w) : cld(m.src, `f_auto,q_auto,w_${w}`));
const videoSrc = (url, w = 1080) => cld(url, `q_auto,w_${w}`);

const SLIDE_MS = 3800;
const CDN = "https://res.cloudinary.com/k44zr7ap";
const IG_USER = "holanath";
const AVATAR = cld(`${CDN}/image/upload/v1791836033/SaveClip.App_839914246_18633196183060789_4267328050493122550_n.jpg`, "f_auto,q_auto,w_500");

/* ═══════════════ DATA ═══════════════ */
const URLS = {
	ig: "https://www.instagram.com/holanath/",
	tiktok: "https://www.tiktok.com/@nataliacerocua",
	facebook: "https://www.facebook.com/people/Nathalia-Enciso/61572906185159/",
	mail: "mailto:nathaliaencisogomez@gmail.com?subject=" + encodeURIComponent("Collab con Nath ✈️"),
	spotify: "https://open.spotify.com/show/0c0x4DogJdipVYxEuKamsa",
	spotifyEmbed: "https://open.spotify.com/embed/show/0c0x4DogJdipVYxEuKamsa?utm_source=generator",
	podcastIg: "https://www.instagram.com/entremitosymujeres/",
	community: "https://www.instagram.com/juntassinpresion/",
	gastos: "https://drive.google.com/file/d/1E6K3MQMQogmKGlDicRhYXlOqnDHdAgXc/view?usp=drive_link",
};

const TRIP = {
	tag: "Mi último viaje · Brasil 🇧🇷",
	title: "Brasil 2026",
	caption: "Así se vive viajar sola a Brasil 🇧🇷 desliza para ver todo 👉",
	url: URLS.ig,
	media: [
		{ type: "image", src: `${CDN}/image/upload/v1791836033/SaveClip.App_839914246_18633196183060789_4267328050493122550_n.jpg` },
		{ type: "image", src: `${CDN}/image/upload/v1791836034/SaveClip.App_839707882_18633195988060789_1768836844652154046_n.jpg` },
		{ type: "image", src: `${CDN}/image/upload/v1791836034/SaveClip.App_838682319_18633196090060789_5343339489536018501_n.jpg` },
		{ type: "image", src: `${CDN}/image/upload/v1791836034/SaveClip.App_841260136_18633196462060789_6309140478072411576_n.jpg` },
		{ type: "video", src: `${CDN}/video/upload/v1791836034/SaveClip.App_AQNziYBDrRvM_HplLc2Dg5JgeyEmcQMuBI6g2Pk--5h1YynZZDSIZYfukG2tSh-WGdKq2dRC-rR77aFMLGP_QHAO6mB1DVSw_C77KN0.mp4` },
		{ type: "image", src: `${CDN}/image/upload/v1791836033/SaveClip.App_841317557_18633196411060789_1505395625212678372_n.jpg` },
		{ type: "image", src: `${CDN}/image/upload/v1791836033/SaveClip.App_840519930_18633196147060789_4612916327899179682_n.jpg` },
	],
};

const REEL = `${CDN}/video/upload/v1791836133/SaveClip.App_AQO9nZGUNWhAlE6rf2Jmkaja5jgYfJWLhja403jHfTVT3S0tva5Ci6J56KRiPP5kxgt1hNKPrN5xzUtPTfhYDyDYPwYPkN7UUNz7J_s.mp4`;

const LINKS = [
	{ id: "ig", label: "Instagram", handle: "@holanath", meta: "10,6 mil viajando conmigo", url: URLS.ig, icon: "instagram" },
	{ id: "tiktok", label: "TikTok", handle: "@nataliacerocua", meta: "28.1K seguidores · 1.6M likes", url: URLS.tiktok, icon: "tiktok" },
	{ id: "fb", label: "Facebook", handle: "Nathalia Enciso", meta: "La comunidad también está aquí", url: URLS.facebook, icon: "users" },
	{ id: "mail", label: "Collabs & marcas", handle: "nathaliaencisogomez@gmail.com", meta: "Viajemos juntos con tu marca ✈️", url: URLS.mail, icon: "mail" },
];

const COMMUNITY = ["Journaling ✍️", "Frases para el alma 🌙", "Planes que inspiran 🌿"];
const NAME = "NATH".split("");

/* ═══════════════ ICONS ═══════════════ */
const Icon = ({ name, size = 22 }) => {
	const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
	switch (name) {
		case "instagram": return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
		case "tiktok": return <svg {...p}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>;
		case "users": return <svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.6c2.6.2 4.6 2 5.5 5.4" /></svg>;
		case "mail": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 7l9 6 9-6" /></svg>;
		case "arrow": return <svg {...p}><path d="M7 17L17 7M8 7h9v9" /></svg>;
		case "heart": return <svg {...p}><path d="M12 20s-7-4.4-9.3-9C1.2 7.7 3.3 4 7 4c2 0 3.3 1 5 3 1.7-2 3-3 5-3 3.7 0 5.8 3.7 4.3 7-2.3 4.6-9.3 9-9.3 9z" /></svg>;
		case "comment": return <svg {...p}><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z" /></svg>;
		case "send": return <svg {...p}><path d="M22 3L10 14M22 3l-7 18-5-7-7-5z" /></svg>;
		case "bookmark": return <svg {...p}><path d="M19 21l-7-5-7 5V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z" /></svg>;
		case "play": return <svg {...p}><path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none" /></svg>;
		case "close": return <svg {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
		case "left": return <svg {...p}><path d="M15 18l-6-6 6-6" /></svg>;
		case "right": return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
		case "share": return <svg {...p}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" /></svg>;
		case "muted": return <svg {...p}><path d="M11 5L6 9H3v6h3l5 4z" /><path d="M22 9l-6 6M16 9l6 6" /></svg>;
		case "sound": return <svg {...p}><path d="M11 5L6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>;
		case "carousel": return <svg {...p}><rect x="7" y="7" width="13" height="13" rx="2" /><path d="M4 16V5a1 1 0 0 1 1-1h11" /></svg>;
		case "mic": return <svg {...p}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" /></svg>;
		default: return null;
	}
};

/* ═══════════════ HOOKS ═══════════════ */
const useCountUp = (target, start, duration = 2200) => {
	const [v, setV] = useState(0);
	useEffect(() => {
		if (!start) return;
		let raf;
		const t0 = performance.now();
		const tick = (now) => {
			const p = Math.min(1, (now - t0) / duration);
			setV(Math.round(target * (1 - Math.pow(1 - p, 4))));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, start, duration]);
	return v;
};

const useModalBasics = (close, onKey) => {
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "Escape") close();
			onKey?.(e);
		};
		window.addEventListener("keydown", handler);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", handler);
			document.body.style.overflow = prev;
		};
	}, [close, onKey]);
};

/* ═══════════════ MINI POST (carrusel tipo Instagram) ═══════════════ */
const PostModal = ({ post, onClose }) => {
	const n = post.media.length;
	const [idx, setIdx] = useState(0);
	const [paused, setPaused] = useState(false);
	const [drag, setDrag] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [vProg, setVProg] = useState(0);
	const [muted, setMuted] = useState(true);
	const [liked, setLiked] = useState(false);
	const [saved, setSaved] = useState(false);
	const [burst, setBurst] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const startX = useRef(null);
	const lastTap = useRef(0);
	const videoRef = useRef(null);
	const current = post.media[idx];

	const go = useCallback((d) => {
		setVProg(0);
		setIdx((i) => (i + d + n) % n);
	}, [n]);
	const close = useCallback(() => {
		setLeaving(true);
		setTimeout(onClose, 320);
	}, [onClose]);
	const onKey = useCallback((e) => {
		if (e.key === "ArrowRight") go(1);
		if (e.key === "ArrowLeft") go(-1);
	}, [go]);
	useModalBasics(close, onKey);

	useEffect(() => {
		const v = videoRef.current;
		if (!v) return;
		if (paused) v.pause();
		else v.play().catch(() => {});
	}, [paused, idx]);

	const like = () => {
		setLiked(true);
		setBurst((b) => b + 1);
	};
	const onDown = (e) => {
		startX.current = e.clientX;
		setDragging(true);
		setPaused(true);
		e.currentTarget.setPointerCapture?.(e.pointerId);
	};
	const onMove = (e) => startX.current !== null && setDrag(e.clientX - startX.current);
	const onUp = (e) => {
		if (startX.current === null) return;
		const dx = e.clientX - startX.current;
		startX.current = null;
		setDragging(false);
		setDrag(0);
		setPaused(false);
		if (dx < -50) go(1);
		else if (dx > 50) go(-1);
		else if (Math.abs(dx) < 8) {
			const now = Date.now();
			if (now - lastTap.current < 320) {
				like();
				lastTap.current = 0;
			} else lastTap.current = now;
		}
	};
	const onCancel = () => {
		startX.current = null;
		setDragging(false);
		setDrag(0);
		setPaused(false);
	};
	const stop = (e) => e.stopPropagation();

	return (
		<div className={`nt-modal ${leaving ? "is-leaving" : ""}`} onClick={close} role="dialog" aria-modal="true" aria-label={post.title}>
			<article className="nt-post" onClick={stop}>
				<header className="nt-post-head">
					<span className="nt-post-avatar"><img src={AVATAR} alt="" /></span>
					<span className="nt-post-user"><strong>{IG_USER}</strong><small>{post.tag}</small></span>
					<button className="nt-post-close" onClick={close} aria-label="Cerrar"><Icon name="close" size={18} /></button>
				</header>

				<div className="nt-post-media" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onCancel}>
					<div className="nt-bars">
						{post.media.map((m, i) => {
							const isCur = i === idx;
							const cls = i < idx ? "done" : isCur ? (m.type === "video" ? "vid" : "run") : "";
							const style = isCur
								? m.type === "video"
									? { width: `${vProg * 100}%` }
									: { animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }
								: undefined;
							return (
								<span key={i} className="nt-bar">
									<i key={isCur ? `run-${idx}` : `bar-${i}`} className={cls} style={style} onAnimationEnd={isCur && m.type !== "video" ? () => go(1) : undefined} />
								</span>
							);
						})}
					</div>
					<span className="nt-post-index">{idx + 1}/{n}</span>

					<div className={`nt-track ${dragging ? "is-drag" : ""}`} style={{ transform: `translateX(calc(${-idx * 100}% + ${drag}px))` }}>
						{post.media.map((m, i) => (
							<div className="nt-slide" key={i}>
								{m.type === "video" && i === idx ? (
									<video
										ref={videoRef}
										src={videoSrc(m.src)}
										poster={videoPoster(m.src)}
										autoPlay
										muted={muted}
										playsInline
										onTimeUpdate={(e) => {
											const v = e.currentTarget;
											setVProg(v.duration ? v.currentTime / v.duration : 0);
										}}
										onEnded={() => go(1)}
									/>
								) : (
									<img src={mediaSrc(m)} alt="" draggable={false} loading={Math.abs(i - idx) <= 1 ? "eager" : "lazy"} />
								)}
							</div>
						))}
					</div>

					<button className="nt-nav prev" onPointerDown={stop} onClick={() => go(-1)} aria-label="Anterior"><Icon name="left" size={18} /></button>
					<button className="nt-nav next" onPointerDown={stop} onClick={() => go(1)} aria-label="Siguiente"><Icon name="right" size={18} /></button>
					{current.type === "video" && (
						<button className="nt-mute" onPointerDown={stop} onClick={() => setMuted((m) => !m)} aria-label={muted ? "Activar sonido" : "Silenciar"}>
							<Icon name={muted ? "muted" : "sound"} size={16} />
						</button>
					)}
					{burst > 0 && <span key={burst} className="nt-burst"><Icon name="heart" size={110} /></span>}
					<span className="nt-swipe-hint">desliza ← →  ·  doble tap ♥</span>
				</div>

				<div className="nt-post-actions">
					<button className={`nt-act ${liked ? "liked" : ""}`} onClick={() => (liked ? setLiked(false) : like())} aria-label="Me gusta"><Icon name="heart" size={26} /></button>
					<a className="nt-act" href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Comentar"><Icon name="comment" size={24} /></a>
					<a className="nt-act" href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Compartir"><Icon name="send" size={23} /></a>
					<span className="nt-dots" aria-hidden="true">{post.media.map((_, i) => <i key={i} className={i === idx ? "on" : ""} />)}</span>
					<button className={`nt-act save ${saved ? "liked" : ""}`} onClick={() => setSaved((s) => !s)} aria-label="Guardar"><Icon name="bookmark" size={24} /></button>
				</div>
				<p className="nt-post-caption"><b>{IG_USER}</b>{post.caption}</p>
				<a className="nt-post-cta" href={post.url} target="_blank" rel="noopener noreferrer">Ver todo el viaje en Instagram <Icon name="arrow" size={18} /></a>
			</article>
		</div>
	);
};

/* ═══════════════ REEL A PANTALLA COMPLETA ═══════════════ */
const ReelModal = ({ src, onClose }) => {
	const vRef = useRef(null);
	const [muted, setMuted] = useState(false);
	const [paused, setPaused] = useState(false);
	const [prog, setProg] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const close = useCallback(() => {
		setLeaving(true);
		setTimeout(onClose, 320);
	}, [onClose]);
	useModalBasics(close);

	useEffect(() => {
		const v = vRef.current;
		if (!v) return;
		v.play().catch(() => {
			v.muted = true;
			setMuted(true);
			v.play().catch(() => {});
		});
	}, []);

	const togglePlay = () => {
		const v = vRef.current;
		if (!v) return;
		if (v.paused) {
			v.play();
			setPaused(false);
		} else {
			v.pause();
			setPaused(true);
		}
	};

	return (
		<div className={`nt-modal ${leaving ? "is-leaving" : ""}`} onClick={close} role="dialog" aria-modal="true" aria-label="Reel">
			<div className="nt-reel" onClick={(e) => e.stopPropagation()}>
				<video
					ref={vRef}
					src={videoSrc(src)}
					poster={videoPoster(src)}
					playsInline
					loop
					muted={muted}
					onClick={togglePlay}
					onTimeUpdate={(e) => {
						const v = e.currentTarget;
						setProg(v.duration ? v.currentTime / v.duration : 0);
					}}
				/>
				<div className="nt-reel-bar"><i style={{ width: `${prog * 100}%` }} /></div>
				<header className="nt-reel-top">
					<span className="nt-post-avatar"><img src={AVATAR} alt="" /></span>
					<strong>{IG_USER}</strong>
					<button className="nt-reel-btn" onClick={close} aria-label="Cerrar"><Icon name="close" size={18} /></button>
				</header>
				{paused && <span className="nt-reel-paused"><Icon name="play" size={34} /></span>}
				<button className="nt-reel-btn mute" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Activar sonido" : "Silenciar"}>
					<Icon name={muted ? "muted" : "sound"} size={18} />
				</button>
				<a className="nt-reel-cta" href={URLS.ig} target="_blank" rel="noopener noreferrer">Más reels en Instagram <Icon name="arrow" size={16} /></a>
			</div>
		</div>
	);
};

/* ═══════════════ HOME ═══════════════ */
export const Home = () => {
	const [mounted, setMounted] = useState(false);
	const [openTrip, setOpenTrip] = useState(false);
	const [openReel, setOpenReel] = useState(false);
	const [tick, setTick] = useState(0);
	const [passIn, setPassIn] = useState(false);
	const [toast, setToast] = useState("");
	const passRef = useRef(null);

	const community = useCountUp(38700, passIn);

	useEffect(() => {
		const r = requestAnimationFrame(() => setMounted(true));
		const id = setInterval(() => setTick((t) => t + 1), 2600);
		return () => {
			cancelAnimationFrame(r);
			clearInterval(id);
		};
	}, []);

	// Revelado al hacer scroll
	useEffect(() => {
		const els = document.querySelectorAll("[data-reveal]:not([data-visible])");
		const io = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.dataset.visible = "true";
						io.unobserve(e.target);
					}
				}),
			{ threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);

	// El contador del pase de abordar arranca cuando se ve
	useEffect(() => {
		const el = passRef.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => e.isIntersecting && (setPassIn(true), io.disconnect()), { threshold: 0.4 });
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		if (!toast) return;
		const t = setTimeout(() => setToast(""), 2200);
		return () => clearTimeout(t);
	}, [toast]);

	const share = async () => {
		const data = { title: "Nath ✈️", text: "Viaja conmigo ✨", url: window.location.href };
		try {
			if (navigator.share) return await navigator.share(data);
			await navigator.clipboard.writeText(data.url);
			setToast("¡Link copiado! ✈️");
		} catch {
			/* cancelado */
		}
	};

	const tilt = (e) => {
		const el = e.currentTarget;
		const r = el.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width - 0.5;
		const y = (e.clientY - r.top) / r.height - 0.5;
		el.style.setProperty("--rx", `${-y * 12}deg`);
		el.style.setProperty("--ry", `${x * 14}deg`);
	};
	const untilt = (e) => {
		e.currentTarget.style.setProperty("--rx", "0deg");
		e.currentTarget.style.setProperty("--ry", "0deg");
	};

	const closeTrip = useCallback(() => setOpenTrip(false), []);
	const closeReel = useCallback(() => setOpenReel(false), []);
	const preview = TRIP.media.slice(0, 5);

	return (
		<div className={`nt-wrap ${mounted ? "is-in" : ""}`}>
			{/* Cielo */}
			<div className="nt-sky" aria-hidden="true">
				<span className="nt-sun" />
				<span className="nt-cloud c1" />
				<span className="nt-cloud c2" />
				<span className="nt-cloud c3" />
				<span className="nt-cloud c4" />
				<div className="nt-grain" />
			</div>

			<button className="nt-share" onClick={share} aria-label="Compartir"><Icon name="share" size={18} /></button>

			<main className="nt-card">
				{/* ─── HERO (compacto) ─── */}
				<header className="nt-head">
					<span className="nt-pill nt-rise" style={{ "--d": ".05s" }}><i>✈</i> EN RUTA · PASITO A PASITO</span>

					<div className="nt-window-wrap nt-rise" style={{ "--d": ".15s" }}>
						<div className="nt-window">
							<div className="nt-window-glass">
								<img src={AVATAR} alt="Nath" />
								<span className="nt-window-cloud" />
								<span className="nt-window-shade" />
							</div>
						</div>
						<span className="nt-seat">✦ 1A</span>
					</div>

					<h1 className="nt-name" aria-label="Nath">
						{NAME.map((c, i) => <span key={i} style={{ "--i": i }} aria-hidden="true">{c}</span>)}
					</h1>
					<p className="nt-sub nt-rise" style={{ "--d": ".6s" }}>Nathalia Enciso · viajes, lifestyle y poder femenino ✨</p>
					<p className="nt-quote nt-rise" style={{ "--d": ".7s" }}>Vamos a ser lo que queramos ser, <b>felices</b> 🫶</p>
				</header>

				{/* ─── PASE DE ABORDAR (mini) ─── */}
				<div className="nt-pass-wrap nt-rise" style={{ "--d": ".85s" }} ref={passRef}>
					<div className="nt-pass">
						<div className="nt-pass-main">
							<div className="nt-pass-top"><span>NATH AIRLINES ✈</span><span>BOARDING PASS · 1A</span></div>
							<div className="nt-pass-mid">
								<div className="nt-pass-count">
									<strong>+{community.toLocaleString("es-CO")}</strong>
									<small>VIAJANDO CONMIGO</small>
								</div>
								<div className="nt-pass-route">
									<b>COL</b>
									<span className="nt-pass-path"><i /><em>✈</em></span>
									<b>🌎</b>
								</div>
							</div>
							<div className="nt-pass-stats">
								<span><b>10,6K</b>IG</span>
								<span><b>28.1K</b>TikTok</span>
								<span><b>1.6M</b>likes</span>
							</div>
						</div>
						<div className="nt-pass-stub"><span className="nt-barcode" /></div>
						<span className={`nt-stamp ${passIn ? "on" : ""}`}>¡A BORDO!</span>
					</div>
				</div>

				{/* ─── MI ÚLTIMO VIAJE + REEL ─── */}
				<div className="nt-title" data-reveal><h2>MI ÚLTIMO VIAJE</h2><span>tócalo ✦</span></div>
				<div className="nt-trip">
					<div data-reveal>
						<button className="nt-postcard" onClick={() => setOpenTrip(true)} onMouseMove={tilt} onMouseLeave={untilt} aria-label="Ver mi último viaje">
							<span className="nt-postcard-media">
								{preview.map((m, j) => (
									<img key={j} src={mediaSrc(m, 600)} className={j === tick % preview.length ? "on" : ""} alt="" loading="lazy" draggable={false} />
								))}
							</span>
							<span className="nt-postmark">BRASIL<br />2026</span>
							<span className="nt-postage">🇧🇷</span>
							<span className="nt-postcard-count"><Icon name="carousel" size={13} />{TRIP.media.length}</span>
							<span className="nt-postcard-info"><strong>{TRIP.title}</strong><em>ver el viaje <Icon name="arrow" size={13} /></em></span>
						</button>
					</div>
					<div data-reveal style={{ "--d": ".1s" }}>
						<button className="nt-reelcard" onClick={() => setOpenReel(true)} aria-label="Ver reel con sonido">
							<video src={videoSrc(REEL, 600)} poster={videoPoster(REEL, 600)} autoPlay muted loop playsInline preload="metadata" />
							<span className="nt-reel-pill"><Icon name="play" size={11} /> REEL</span>
							<span className="nt-reel-ring"><Icon name="play" size={18} /></span>
							<span className="nt-postcard-info"><strong>Dale play</strong><em>con sonido <Icon name="sound" size={13} /></em></span>
						</button>
					</div>
				</div>

				{/* ─── LINKS (lo primero que se encuentra) ─── */}
				<nav className="nt-links">
					{LINKS.map((l, i) => (
						<div key={l.id} className="nt-tag-wrap nt-rise" style={{ "--d": `${1 + i * 0.08}s` }}>
							<a
								href={l.url}
								target={l.id === "mail" ? undefined : "_blank"}
								rel="noopener noreferrer"
								className={`nt-tag is-${l.id}`}
							>
								<span className="nt-tag-hole" />
								<span className="nt-tag-icon"><Icon name={l.icon} size={22} /></span>
								<span className="nt-tag-text"><small>{l.label}</small><strong>{l.handle}</strong><em>{l.meta}</em></span>
								<span className="nt-tag-arrow"><Icon name="arrow" size={18} /></span>
							</a>
						</div>
					))}
				</nav>

				{/* ─── PODCAST ─── */}
				<section className="nt-pod" data-reveal>
					<div className="nt-pod-head">
						<span className="nt-pod-mic"><Icon name="mic" size={20} /></span>
						<div>
							<small>PODCAST</small>
							<h3>Entre mitos y mujeres</h3>
						</div>
						<span className="nt-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
					</div>
					<p>El chisme con historia, con arte y con alma: historias de mujeres contadas como entre amigas.</p>
					<iframe
						className="nt-pod-embed"
						src={URLS.spotifyEmbed}
						title="Entre mitos y mujeres en Spotify"
						width="100%"
						height="152"
						frameBorder="0"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
					<div className="nt-pod-actions">
						<a href={URLS.spotify} target="_blank" rel="noopener noreferrer">Escuchar en Spotify ↗</a>
						<a href={URLS.podcastIg} target="_blank" rel="noopener noreferrer">@entremitosymujeres</a>
					</div>
				</section>

				{/* ─── EXTRAS: comunidad + recibo ─── */}
				<div className="nt-extras">
					<a className="nt-mini-wrap" href={URLS.community} target="_blank" rel="noopener noreferrer" data-reveal>
						<div className="nt-mini nt-journal">
							<span className="nt-tape" />
							<small>COMUNIDAD</small>
							<h3>Juntas sin presión 💛</h3>
							<ul>
								{COMMUNITY.map((c, i) => (
									<li key={c} style={{ "--d": `${0.3 + i * 0.25}s` }}><i />{c}</li>
								))}
							</ul>
							<span className="nt-mini-go teal">Únete <Icon name="arrow" size={14} /></span>
						</div>
					</a>
					<a className="nt-mini-wrap" href={URLS.gastos} target="_blank" rel="noopener noreferrer" data-reveal style={{ "--d": ".1s" }}>
						<div className="nt-mini nt-receipt">
							<small>🧾 RECIBO · BRASIL</small>
							<h3>¿Cuánto me costó Brasil?</h3>
							<div className="nt-r-row"><span>✈️ Vuelos</span><i /><span>???</span></div>
							<div className="nt-r-row"><span>🛏️ Hotel</span><i /><span>???</span></div>
							<div className="nt-r-row"><span>🥥 Comida</span><i /><span>???</span></div>
							<span className="nt-mini-go coral">Descúbrelo <Icon name="arrow" size={14} /></span>
						</div>
					</a>
				</div>

				<footer className="nt-foot" data-reveal>
					<p>Vamos a ser lo que queramos ser, felices 🫶</p>
					<small>NATH · {new Date().getFullYear()} · PASITO A PASITO</small>
				</footer>
			</main>

			{openTrip && <PostModal post={TRIP} onClose={closeTrip} />}
			{openReel && <ReelModal src={REEL} onClose={closeReel} />}
			{toast && <div className="nt-toast">{toast}</div>}
		</div>
	);
};

export default Home;