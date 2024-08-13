<?php

namespace App\Listeners;

use App\Events\HorasExtrasEvent;
use App\Mail\NotificadorMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class EnvioEmailExtrasListen
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(HorasExtrasEvent $event): void
    {
        print_r($event->extraHours->email);
        Mail::raw("Hola el creador de las horas extras de tu área las envio para tu aprobación", function ($message) {
            $message->to('destinatario@dominio.com')
                ->subject('Notificación de Horas Extras');
        });
    }
}
