import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../website-core/shared/services/cart.service';
import { WebsiteService } from '@core/service/website.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isOpenLogin = false;
  isOpenCoupon = false;
  shipCost: number = 0;
  couponCode: string = '';
  payment_name: number = 0;
  control: any;
  checkoutForm!: FormGroup;
  cardForm!: FormGroup;
  data: any;
  
  get detalle(): FormArray {
    return this.checkoutForm.get('detalle') as FormArray;
  }
  
  constructor(
    public cartService: CartService, 
    private fb:  FormBuilder,
    private webService: WebsiteService  
  ) { }

  handleOpenLogin() {
    this.isOpenLogin = !this.isOpenLogin;
  }
  handleOpenCoupon() {
    this.isOpenCoupon = !this.isOpenCoupon;
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }

  changeHandler(selectedOption: { value: string; text: string }) {
    console.log('Selected option:', selectedOption);

    // Update the 'country' form control with the selected option's value
    this.checkoutForm.patchValue({
      tipo_pago: selectedOption.value
    });
  }

  handleCouponSubmit() {
    console.log(this.couponCode);
    // Add coupon code handling logic here
    if (this.couponCode) {
      // logic here

      // when submitted the from than empty will be coupon code
      this.couponCode = ''
    }
  }

  handlePayment(value: number) {
    this.checkoutForm.get('tipo_pago')?.setValue(value);
    this.payment_name = value;
  }

  public formSubmitted = false;

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      razon_social: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      nit: ['', Validators.required],
      celular: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_pago: ['', [Validators.required]],
      detalle: this.fb.array([])
    });

    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvc: ['', Validators.required],
      cardHolderName: ['', Validators.required]
    });

    this.control = this.checkoutForm.controls['detalle'] as FormArray;

    if (this.cartService.getCartProducts()) {
      this.cartService.getCartProducts().forEach((data: any, index: any) => {
        this.sumarControl();
        this.control.controls[index].patchValue({
          producto_id: data.id,
          cantidad: data.orderQuantity
        });
      });
    }
  }

  createFormDetalle(): FormGroup {
    return this.fb.group({
      producto_id: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  sumarControl() {
    this.control.push(this.createFormDetalle());
  }

  getById(data: any) {
    this.checkoutForm.patchValue({
      razon_social: data.razon_social,
      nombre_completo: data.nombre_completo,
      nit: data.nit,
      celular: data.celular,
      direccion: data.direccion,
      email: data.email,
      tipo_pago: data.tipo_pago,
    });
  }

  onSubmit(form: any) {
    if (this.checkoutForm.valid) 
    this.formSubmitted = true; {
      Swal.fire({
        title: '¿Está seguro?',
        text: "¡Esta acción no podrá revertirse!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'primary',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Realizar Pedido',
        cancelButtonText: 'Cancelar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.webService.websitePedido(form)
            .pipe(
              finalize(() => {
                this.checkoutForm.markAsPristine();
                this.formSubmitted = false;
              })
            )
            .subscribe(data => {
              Swal.fire({
                title: "Éxito",
                text: data.success,
                icon: "success"
              });
              this.data = data.success;
              this.cartService.clear_cart_prueba();
            },
              error => {
                this.formSubmitted = false; // Reset formSubmitted to false
                Swal.fire({
                  title: "Ocurrió un problema",
                  text: error.error,
                  icon: "error"
                });
              }
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.formSubmitted = false; // Reset formSubmitted to false
          Swal.fire({
            title: "Cancelado",
            text: "Su compra ha sido cancelada con éxito.",
            icon: "error"
          });
        }
      });
    }
  }

  onCardSubmit(value: any) {
    if (this.cardForm.valid) {
      console.log('Pago con tarjeta:', value);
      // Añade la lógica de procesamiento de pago con tarjeta aquí
    } else {
      console.log('Formulario de tarjeta inválido');
    }
  }
}
