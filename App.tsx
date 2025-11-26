import React, { useState, useMemo } from 'react';
import { PRODUCTS, DELIVERY_FEE, PIZZA_SIZES, PHONE_NUMBER } from './constants';
import { Product, CartItem, Order, Category, PriceSize, Crust } from './types';

// Icons
const CartIcon = () => <i className="fas fa-shopping-cart"></i>;
const PizzaIcon = () => <i className="fas fa-pizza-slice"></i>;
const DrinkIcon = () => <i className="fas fa-wine-bottle"></i>;
const SweetIcon = () => <i className="fas fa-cookie-bite"></i>;
const LocationIcon = () => <i className="fas fa-map-marker-alt"></i>;
const PlusIcon = () => <i className="fas fa-plus"></i>;
const MinusIcon = () => <i className="fas fa-minus"></i>;
const CloseIcon = () => <i className="fas fa-times"></i>;
const WhatsappIcon = () => <i className="fab fa-whatsapp"></i>;
const GpsIcon = () => <i className="fas fa-crosshairs"></i>;
const CheckIcon = () => <i className="fas fa-check-circle"></i>;
const MapIcon = () => <i className="fas fa-map-marked-alt"></i>;

// --- Subcomponents ---

// 1. Header Component
const Header = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => (
  <header className="sticky top-0 z-50 bg-shekinah-red text-white shadow-lg">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-shekinah-red font-bold text-xl">
          S
        </div>
        <div>
          <h1 className="text-xl font-bold leading-none">PIZZAS</h1>
          <h2 className="text-sm font-light text-shekinah-gold leading-none tracking-widest">SHEKINAH</h2>
        </div>
      </div>
      <button 
        onClick={onOpenCart}
        className="relative p-2 hover:bg-red-700 rounded-full transition-colors"
      >
        <span className="text-2xl"><CartIcon /></span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-shekinah-gold text-shekinah-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-shekinah-red">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </header>
);

// 2. Product Modal Component
const ProductModal = ({ 
  product, 
  onClose, 
  onAddToCart 
}: { 
  product: Product, 
  onClose: () => void, 
  onAddToCart: (item: CartItem) => void 
}) => {
  const [size, setSize] = useState<PriceSize | undefined>(product.isPizza ? PIZZA_SIZES[2] : undefined); // Default to Grande
  const [crust, setCrust] = useState<Crust | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [halfHalf, setHalfHalf] = useState(false);
  const [secondHalf, setSecondHalf] = useState<Product | null>(null);

  // Use basePrice for drinks, or calculated price for pizzas
  const basePrice = product.isPizza ? (size?.price || 0) : (product.basePrice || 0);
  const crustPrice = crust?.price || 0;
  const totalItemPrice = (basePrice + crustPrice) * quantity;

  const handleAdd = () => {
    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      product,
      secondHalfProduct: halfHalf && secondHalf ? secondHalf : undefined,
      selectedSize: size,
      selectedCrust: crust,
      quantity,
      totalPrice: totalItemPrice
    });
    onClose();
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="relative h-48 bg-gray-200">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }}
          />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white text-black w-8 h-8 rounded-full shadow-lg flex items-center justify-center">
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-1 mb-4">{product.description}</p>

          {product.isPizza && (
            <>
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-700">Escolha o Tamanho:</h4>
                <div className="space-y-2">
                  {PIZZA_SIZES.map((s) => (
                    <label key={s.label} className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${size?.label === s.label ? 'border-shekinah-red bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="size" 
                          className="w-5 h-5 text-shekinah-red focus:ring-shekinah-red border-gray-300"
                          checked={size?.label === s.label}
                          onChange={() => {
                            setSize(s);
                            if (s.label !== 'Média' && s.label !== 'Grande') {
                              setHalfHalf(false);
                              setSecondHalf(null);
                            }
                          }}
                        />
                        <div className="ml-3">
                          <span className={`block font-medium ${size?.label === s.label ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{s.label}</span>
                          <span className="text-xs text-gray-500">{s.slices} pedaços</span>
                        </div>
                      </div>
                      <span className="font-bold text-shekinah-red">R$ {s.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(size?.label === 'Média' || size?.label === 'Grande') && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-gray-700">Metade a Metade:</h4>
                  <div className="space-y-2">
                    <label className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${halfHalf ? 'border-shekinah-red bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-shekinah-red focus:ring-shekinah-red border-gray-300"
                          checked={halfHalf}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setHalfHalf(checked);
                            if (!checked) setSecondHalf(null);
                          }}
                        />
                        <span className={`ml-3 ${halfHalf ? 'font-bold text-gray-800' : 'text-gray-600'}`}>Escolher dois sabores</span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">Mesmo preço</span>
                    </label>
                    {halfHalf && (
                      <div className="mt-2">
                        <select
                          className="w-full p-3 border rounded-lg bg-white"
                          value={secondHalf?.id || ''}
                          onChange={(e) => {
                            const sel = PRODUCTS.find(p => p.id === e.target.value);
                            if (sel && sel.isPizza && sel.id !== product.id) {
                              setSecondHalf(sel);
                            } else {
                              setSecondHalf(null);
                            }
                          }}
                        >
                          <option value="">Selecione o segundo sabor</option>
                          {PRODUCTS.filter(p => p.isPizza && p.category === product.category && p.id !== product.id).map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-700">Escolha a Borda:</h4>
                <div className="space-y-2">
                   <label className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${!crust ? 'border-shekinah-red bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                      <div className="flex items-center">
                         <input 
                            type="radio" 
                            name="crust" 
                            className="w-5 h-5 text-shekinah-red focus:ring-shekinah-red border-gray-300"
                            checked={!crust} 
                            onChange={() => setCrust(undefined)} 
                          />
                         <span className={`ml-3 ${!crust ? 'font-bold text-gray-800' : 'text-gray-600'}`}>Sem Borda Recheada</span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">Grátis</span>
                   </label>
                   {['Catupiry', 'Cheddar', 'Chocolate', 'Chocolate Branco', 'Doce de Leite'].map(cName => (
                     <label key={cName} className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${crust?.name === cName ? 'border-shekinah-red bg-red-50' : 'border-gray-200 hover:border-red-200'}`}>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            name="crust" 
                            className="w-5 h-5 text-shekinah-red focus:ring-shekinah-red border-gray-300"
                            checked={crust?.name === cName} 
                            onChange={() => setCrust({ name: cName, price: 13.00 })} 
                          />
                          <span className={`ml-3 ${crust?.name === cName ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{cName}</span>
                        </div>
                        <span className="font-bold text-shekinah-red">+ R$ 13,00</span>
                     </label>
                   ))}
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <span className="font-semibold">Quantidade:</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                <MinusIcon />
              </button>
              <span className="font-bold text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-shekinah-red text-white flex items-center justify-center hover:bg-red-700"
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <button 
            onClick={handleAdd}
            disabled={product.isPizza && halfHalf && !secondHalf}
            className={`w-full bg-shekinah-green text-white font-bold py-4 rounded-lg shadow-lg transition-colors flex justify-between px-6 ${product.isPizza && halfHalf && !secondHalf ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-800'}`}
          >
            <span>Adicionar ao Pedido</span>
            <span>R$ {totalItemPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Cart/Checkout Modal
const CartModal = ({ 
  cart, 
  onClose, 
  onRemoveItem, 
  onClearCart 
}: { 
  cart: CartItem[], 
  onClose: () => void, 
  onRemoveItem: (id: string) => void,
  onClearCart: () => void
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [addressText, setAddressText] = useState('');
  const [gpsLocation, setGpsLocation] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('Pix');
  const [changeFor, setChangeFor] = useState('');
  
  // States for Geolocation and Validation
  const [locationLoading, setLocationLoading] = useState(false);
  const [errors, setErrors] = useState<{name: boolean, address: boolean}>({ name: false, address: false });

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const total = subtotal + DELIVERY_FEE;

  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
          setGpsLocation(link);
          setLocationLoading(false);
          // Don't clear address error here, as manual address is still required/separate
        },
        (error) => {
          alert("Erro ao obter localização. Verifique as permissões do seu navegador.");
          setLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocalização não suportada neste navegador.");
      setLocationLoading(false);
    }
  };

  const validateAndSend = () => {
    // Reset errors
    const newErrors = {
        name: !customerName.trim(),
        address: !addressText.trim()
    };
    
    setErrors(newErrors);

    if (newErrors.name || newErrors.address) {
        // Shake animation or scroll to top could be added here
        return;
    }

    // Proceed if valid
    let message = `*NOVO PEDIDO - PIZZAS SHEKINAH*\n`;
    message += `--------------------------------\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Endereço:* ${addressText}\n`;
    if (gpsLocation) {
        message += `*📍 Localização GPS:* ${gpsLocation}\n`;
    }
    message += `--------------------------------\n`;
    message += `*ITENS DO PEDIDO:*\n`;
    
    cart.forEach(item => {
      if (item.secondHalfProduct) {
        message += `• ${item.quantity}x Meia ${item.product.name} + Meia ${item.secondHalfProduct.name}`;
      } else {
        message += `• ${item.quantity}x ${item.product.name}`;
      }
      if (item.product.isPizza && item.selectedSize) {
        message += ` (${item.selectedSize.label})`;
      }
      if (item.selectedCrust) {
        message += `\n  + Borda: ${item.selectedCrust.name}`;
      }
      message += ` - R$ ${item.totalPrice.toFixed(2)}\n`;
    });
    
    message += `--------------------------------\n`;
    message += `*Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    message += `*Taxa de Entrega:* R$ ${DELIVERY_FEE.toFixed(2)}\n`;
    message += `*TOTAL:* R$ ${total.toFixed(2)}\n`;
    message += `--------------------------------\n`;
    message += `*Pagamento:* ${paymentMethod}\n`;
    if (paymentMethod === 'Dinheiro' && changeFor) {
      message += `*Troco para:* R$ ${changeFor}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black bg-opacity-70 animate-fade-in">
      <div className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[90vh] sm:rounded-xl shadow-2xl flex flex-col">
        <div className="bg-shekinah-red text-white p-4 flex justify-between items-center sm:rounded-t-xl">
          <h2 className="text-xl font-bold">
            {step === 'cart' ? 'Seu Carrinho' : 'Finalizar Pedido'}
          </h2>
          <button onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {cart.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-500">
               <i className="fas fa-shopping-basket text-4xl mb-2"></i>
               <p>Seu carrinho está vazio.</p>
             </div>
          ) : (
            <>
              {step === 'cart' ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {item.quantity}x {item.secondHalfProduct ? `Meia ${item.product.name} + Meia ${item.secondHalfProduct.name}` : item.product.name}
                        </h4>
                        <div className="text-sm text-gray-600">
                          {item.product.isPizza && item.selectedSize && (
                             <span>{item.selectedSize.label}</span>
                          )}
                          {item.selectedCrust && (
                            <span className="block text-shekinah-green">+ {item.selectedCrust.name}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-gray-900">R$ {item.totalPrice.toFixed(2)}</span>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 pb-6">
                  {/* Checkout Form */}
                  
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Seu Nome <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <i className="fas fa-user"></i>
                        </div>
                        <input 
                        type="text" 
                        className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-shekinah-red/20 outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        placeholder="Digite seu nome completo"
                        value={customerName}
                        onChange={e => {
                            setCustomerName(e.target.value);
                            if(e.target.value) setErrors(prev => ({...prev, name: false}));
                        }}
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">Por favor, informe seu nome.</p>}
                  </div>

                  {/* Endereço Manual */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Endereço Completo <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                        className={`w-full p-3 border rounded-lg outline-none resize-none transition-all focus:ring-2 focus:ring-shekinah-red/20 ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        rows={3}
                        placeholder="Rua, Número, Quadra, Lote, Bairro e Complemento..."
                        value={addressText}
                        onChange={e => {
                            setAddressText(e.target.value);
                            if(e.target.value) setErrors(prev => ({...prev, address: false}));
                        }}
                    ></textarea>
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">O endereço é obrigatório para a entrega.</p>
                    )}
                  </div>

                  {/* Localização GPS (Separado) */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                     <div className="flex items-start gap-3">
                         <div className={`mt-1 rounded-full p-2 ${gpsLocation ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            <MapIcon />
                         </div>
                         <div className="flex-1">
                             <h4 className="font-bold text-gray-800 text-sm">Facilite sua entrega</h4>
                             <p className="text-xs text-gray-600 mb-3">Envie sua localização atual para o entregador chegar mais rápido.</p>
                             
                             {gpsLocation ? (
                                 <div className="flex items-center justify-between bg-white border border-green-200 rounded-lg p-3 shadow-sm">
                                     <div className="flex items-center gap-2 text-green-700">
                                         <CheckIcon />
                                         <span className="text-sm font-bold">Localização anexada!</span>
                                     </div>
                                     <button 
                                        onClick={() => setGpsLocation(null)}
                                        className="text-xs text-red-500 hover:text-red-700 underline font-medium"
                                     >
                                         Remover
                                     </button>
                                 </div>
                             ) : (
                                 <button 
                                    onClick={getLocation}
                                    disabled={locationLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95"
                                 >
                                    {locationLoading ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin"></i>
                                            Buscando...
                                        </>
                                    ) : (
                                        <>
                                            <GpsIcon />
                                            Enviar Minha Localização
                                        </>
                                    )}
                                 </button>
                             )}
                         </div>
                     </div>
                  </div>

                  {/* Forma de Pagamento */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Forma de Pagamento</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Pix', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'].map(method => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method as Order['paymentMethod'])}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                            paymentMethod === method 
                                ? 'bg-shekinah-red text-white border-shekinah-red shadow-md transform scale-[1.02]' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === 'Dinheiro' && (
                    <div className="animate-fade-in bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <label className="block text-sm font-bold text-yellow-800 mb-1">Precisa de troco para quanto?</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-yellow-300 rounded bg-white focus:ring-yellow-400 outline-none" 
                        placeholder="Ex: 50,00 ou Não preciso"
                        value={changeFor}
                        onChange={e => setChangeFor(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 bg-white border-t shadow-inner z-10 w-full sm:rounded-b-xl">
            <div className="space-y-1 mb-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Entrega</span>
                <span>R$ {DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-shekinah-black pt-2 border-t mt-2">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-shekinah-green text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-colors shadow-lg"
              >
                Continuar para Entrega
              </button>
            ) : (
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition-colors"
                >
                  Voltar
                </button>
                <button 
                  onClick={validateAndSend}
                  className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <WhatsappIcon /> Enviar Pedido
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Cart Floating Bar
const CartFloatingBar = ({ cart, onOpenCart }: { cart: CartItem[], onOpenCart: () => void }) => {
  if (cart.length === 0) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div 
      onClick={onOpenCart}
      className="fixed bottom-0 left-0 right-0 z-50 bg-shekinah-red text-white py-3 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-red-700 transition-all duration-300 transform translate-y-0 flex justify-between items-center"
    >
      <div className="flex flex-col">
        <span className="text-xs text-red-100 uppercase tracking-wide">Total (sem entrega)</span>
        <span className="font-bold text-xl">R$ {subtotal.toFixed(2)}</span>
      </div>
      
      <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors">
        <span className="font-semibold text-sm">Ver Carrinho</span>
        <div className="relative">
          <i className="fas fa-shopping-basket text-xl"></i>
          <span className="absolute -top-2 -right-2 bg-shekinah-gold text-shekinah-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-shekinah-red">
            {cart.length}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Salgadas');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => 
    PRODUCTS.filter(p => p.category === activeCategory), 
  [activeCategory]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      
      {/* Banner / Hero */}
      <div className="bg-shekinah-black text-white py-8 px-4 text-center bg-[url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
         <div className="absolute inset-0 bg-black bg-opacity-60"></div>
         <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">A melhor pizza da região!</h2>
            <p className="text-gray-200">Taxa de entrega fixa: R$ 5,00 em toda cidade.</p>
         </div>
      </div>

      {/* Category Navigation */}
      <nav className="sticky top-[64px] z-40 bg-white shadow-sm overflow-x-auto whitespace-nowrap p-4 flex gap-4 no-scrollbar">
        {[
          { id: 'Salgadas', icon: <PizzaIcon />, label: 'Pizzas Salgadas' },
          { id: 'Doces', icon: <SweetIcon />, label: 'Pizzas Doces' },
          { id: 'Bebidas', icon: <DrinkIcon />, label: 'Bebidas' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as Category)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all ${
              activeCategory === cat.id 
                ? 'bg-shekinah-red text-white shadow-md transform scale-105' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Product Grid */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                   <h3 className="text-white font-bold text-lg shadow-black drop-shadow-md">{product.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {product.isPizza ? 'A partir de' : 'Preço'}
                  </span>
                  <span className="text-xl font-bold text-shekinah-red">
                     R$ {product.isPizza ? '45,00' : product.basePrice?.toFixed(2)}
                  </span>
                </div>
                <button className="w-full mt-4 bg-gray-100 text-shekinah-green font-bold py-2 rounded hover:bg-shekinah-green hover:text-white transition-colors">
                  Ver Opções
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="bg-white py-6 mt-8 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="font-bold text-gray-800">Pizzas Shekinah</p>
          <p>Delivery/Retirada: (62) 99543-8553</p>
          <p className="mt-2">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating Cart Bar */}
      <CartFloatingBar cart={cart} onOpenCart={() => setIsCartOpen(true)} />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart} 
        />
      )}

      {isCartOpen && (
        <CartModal 
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
        />
      )}
    </div>
  );
};

export default App;
